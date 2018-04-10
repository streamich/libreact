import {createElement as h} from 'react';
import {mount, shallow} from 'enzyme';
import {MediaSensor} from '..';

const createMatchMedia = () => {
  const matchMedia = jest.fn();
  const matchMediaReturn = {
    matches: [{}],
    addListener: jest.fn(),
    removeListener: jest.fn()
  };

  (window as any).matchMedia = matchMedia;
  matchMedia.mockImplementation(() => matchMediaReturn);

  return [matchMedia, matchMediaReturn];
};

describe('<MediaSensor>', () => {
  it('exists', () => {
    expect(MediaSensor).toBeInstanceOf(Function);
  });

  it('calls correct media query', () => {
    const [matchMedia] = createMatchMedia();
    let children: any = (jest.fn()) as any;
    shallow(<MediaSensor query='(foobar)'>{children}</MediaSensor>);

    expect(matchMedia).toHaveBeenCalledTimes(1);
    expect(matchMedia).toHaveBeenCalledWith('(foobar)');
  });

  it('gets default media query match on mount', () => {
    const [matchMedia] = createMatchMedia();
    let children: any = (jest.fn()) as any;
    shallow(<MediaSensor query='(foobar)'>{children}</MediaSensor>);

    expect(matchMedia).toHaveBeenCalledTimes(1);
    expect(matchMedia).toHaveBeenCalledWith('(foobar)');

    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith({matches: true});

    (window as any).matchMedia = () => ({
      matches: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    });

    children = jest.fn();
    shallow(<MediaSensor query='(foobar)' render={children} />);

    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith({matches: false});
  });

  it('re-renders on media query change', () => {
    let listener;
    const [, matchMediaReturn] = createMatchMedia();

    (matchMediaReturn as any).addListener.mockImplementation((list) => {
      listener = list;
    });

    const MyComp = jest.fn();

    MyComp.mockImplementation(() => null);

    mount(<MediaSensor query='(foobar)' comp={MyComp}></MediaSensor>);

    expect(MyComp).toHaveBeenCalledTimes(1);
    expect(MyComp.mock.calls[0][0]).toEqual({matches: true});

    expect(typeof listener).toBe('function');

    listener({
      matches: null
    });

    expect(MyComp).toHaveBeenCalledTimes(2);
    expect(MyComp.mock.calls[1][0]).toEqual({matches: false});
  });

  it('removes listener on un-mount', () => {
    const [, matchMediaReturn] = createMatchMedia() as any;
    let listener;

    matchMediaReturn.addListener.mockImplementation((list) => {
      listener = list;
    });

    const MyComp = jest.fn();

    MyComp.mockImplementation(() => null);

    const wrapper = mount(<MediaSensor query='(foobar)' comp={MyComp}></MediaSensor>);

    expect(matchMediaReturn.removeListener).toHaveBeenCalledTimes(0);

    wrapper.unmount();

    expect(matchMediaReturn.removeListener).toHaveBeenCalledTimes(1);
    expect(matchMediaReturn.removeListener.mock.calls[0][0]).toBe(listener);
  });

  describe('when changing media query dynamically', () => {
    it('re-attaches listener and removes old one', () => {
      const [, matchMediaReturn] = createMatchMedia() as any;
      let listeners = [];

      matchMediaReturn.addListener.mockImplementation((listener) => {
        listeners.push(listener);
      });

      const MyComp = jest.fn();

      MyComp.mockImplementation(() => null);

      const wrapper = mount(<MediaSensor query='(foo)' component={MyComp}></MediaSensor>);

      expect(matchMediaReturn.addListener).toHaveBeenCalledTimes(1);
      expect(matchMediaReturn.removeListener).toHaveBeenCalledTimes(0);

      wrapper.setProps({
        query: 'bar',
      });

      expect(matchMediaReturn.addListener).toHaveBeenCalledTimes(2);
      expect(matchMediaReturn.removeListener).toHaveBeenCalledTimes(1);

      wrapper.unmount();

      expect(matchMediaReturn.addListener).toHaveBeenCalledTimes(2);
      expect(matchMediaReturn.removeListener).toHaveBeenCalledTimes(2);

      expect(matchMediaReturn.removeListener.mock.calls[0][0]).toBe(listeners[0]);
      expect(matchMediaReturn.removeListener.mock.calls[1][0]).toBe(listeners[1]);
    });
  });
});
