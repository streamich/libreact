import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {Iframe} from '..';


const mockIframeDocument = (wrapper) => {
  const iframe = wrapper.find('iframe').getDOMNode() as HTMLIFrameElement;
  const frameDocument = document.implementation.createHTMLDocument('frame');

  Object.defineProperty(iframe, 'contentDocument', {
    configurable: true,
    value: frameDocument,
  });
  iframe.dispatchEvent(new Event('load'));
  wrapper.update();

  return {iframe, frameDocument};
};

describe('<Iframe>', () => {
  it('exists', () => {
    expect(typeof Iframe).toBe('function');
  });

  it('renders children inside the iframe document', () => {
    const wrapper = mount(
      <Iframe>
        <button id="inside">inside</button>
      </Iframe>
    );

    const {frameDocument} = mockIframeDocument(wrapper);

    expect(frameDocument.body.innerHTML).toContain('inside');
  });

  it('passes through iframe props', () => {
    const wrapper = mount(<Iframe title="test frame" className="frame" />);
    const iframe = wrapper.find('iframe').getDOMNode() as HTMLIFrameElement;

    expect(iframe.getAttribute('title')).toBe('test frame');
    expect(iframe.getAttribute('class')).toBe('frame');
  });

  it('preserves child event handlers through the portal', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Iframe>
        <button onClick={onClick}>inside</button>
      </Iframe>
    );
    const {frameDocument} = mockIframeDocument(wrapper);
    const button = frameDocument.querySelector('button')!;

    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
