import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {LocalStorage} from '..';

const glob = global as any;

const promisify = (assertions, delay = 20) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        assertions();
        resolve();
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
};

describe('<LocalStorage>', () => {
  beforeEach(() => {
    glob.localStorage = {};
  });

  it('is a component', () => {
    expect(LocalStorage).toBeInstanceOf(Function);
  });

  it('puts value to localStorage', () => {
    const wrapper = mount(<LocalStorage name='foo' data='bar' debounce={10} />);

    return promisify(() => {
      expect(glob.localStorage).toMatchSnapshot();
    });
  });

  it('serializes an object', () => {
    const wrapper = mount(<LocalStorage name='foo' data={{key: [1, 2, 3]}} debounce={10} />);

    return promisify(() => {
      expect(glob.localStorage).toMatchSnapshot();
    });
  });

  it('updates on re-render', () => {
    const wrapper = mount(<LocalStorage name='foo' data={1} debounce={10} />);

    wrapper.setProps({
      name: 'foo',
      data: 2
    });

    wrapper.update();

    return promisify(() => {
      expect(glob.localStorage.foo).toBe('2');
    }, 50);
  });

  it('does NOT set initial data when onMount prop is set', () => {
    const wrapper = mount(<LocalStorage name='foo' data={1} debounce={10} onMount={() => {}} />);

    return promisify(() => {
      expect(glob.localStorage).toMatchSnapshot();
    }, 20);
  });
});
