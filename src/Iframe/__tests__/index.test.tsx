import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {Iframe} from '..';

describe('<Iframe>', () => {
  const attach = () => {
    const container = document.createElement('div');

    document.body.appendChild(container);

    return container;
  };

  const detach = (container: HTMLElement) => {
    document.body.removeChild(container);
  };

  it('renders an iframe element', () => {
    const wrapper = mount(<Iframe title='preview' />);

    expect(wrapper.find('iframe')).toHaveLength(1);
    expect(wrapper.find('iframe').prop('title')).toBe('preview');

    wrapper.unmount();
  });

  it('renders children inside the iframe document', () => {
    const container = attach();
    const wrapper = mount(<Iframe><span id='child'>Hello</span></Iframe>, {
      attachTo: container
    });
    const iframe = wrapper.find('iframe').getDOMNode() as HTMLIFrameElement;

    wrapper.update();

    expect(iframe.contentDocument.body.querySelector('#child').textContent).toBe('Hello');

    wrapper.unmount();
    detach(container);
  });

  it('keeps React events working for iframe children', () => {
    const container = attach();
    const onClick = jest.fn();
    const wrapper = mount(
      <Iframe>
        <button id='button' onClick={onClick}>Click me</button>
      </Iframe>,
      {
        attachTo: container
      }
    );
    const iframe = wrapper.find('iframe').getDOMNode() as HTMLIFrameElement;

    wrapper.update();

    const button = iframe.contentDocument.body.querySelector('#button');

    button.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    }));

    expect(onClick).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    detach(container);
  });
});
