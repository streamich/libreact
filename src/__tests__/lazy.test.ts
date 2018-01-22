import {lazy} from '../lazy';
import {Component, createElement as h} from 'react';
import {shallow, mount} from 'enzyme';

describe('lazy()', () => {
  it('is a function', () => {
    expect(typeof lazy).toBe('function');
  });

  it('returns a stateless component', () => {
    const Lazy = lazy({
      loader: () => Promise.resolve(() => null)
    });

    expect(Lazy).toBeInstanceOf(Function);
  });

  it('has .load() method', () => {
    const Lazy = lazy({
      loader: () => Promise.resolve(() => null)
    });

    expect(Lazy.load).toBeInstanceOf(Function);
  });

  it('renders nothing by default', () => {
    const Lazy = lazy({
      loader: () => Promise.resolve(() => null)
    });
    const wrapper = mount(h(Lazy));

    expect(Boolean(wrapper.html())).toBe(false);
  });

  it('renders loading placeholder', () => {
    const Lazy = lazy({
      loading: h('span', {}, 'Loading...'),
      loader: () => Promise.resolve(() => null)
    });
    const wrapper = mount(h(Lazy));

    expect(wrapper.find('span').html()).toBe('<span>Loading...</span>');
  });

  it('loads and renders actual implementation after first render', () => {
    const Implementation = () => h('div', {}, 'IMPLEMENTATION');
    const Lazy = lazy({
      loader: () => Promise.resolve(Implementation)
    });

    const wrapper = mount(h(Lazy));

    expect(Boolean(wrapper.html())).toBe(false);

    return new Promise((resolve, reject) => {
      setImmediate(() => {
        try {
          wrapper.update();
          expect(wrapper.find('div').html()).toBe('<div>IMPLEMENTATION</div>');

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });

  it('does pass through children', () => {
    const Implementation = (props) => h('div', {}, props.children);
    const Lazy = lazy({
      loader: () => Promise.resolve(Implementation),
    });

    const wrapper = mount(h(Lazy, {
      children: 'foobar'
    } as any));

    Lazy.load();

    return new Promise((resolve, reject) => {
      setImmediate(() => {
        try {
          wrapper.update();
          expect(wrapper.find('div').html()).toBe('<div>foobar</div>');
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });
});
