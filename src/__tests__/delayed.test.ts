import {Component, createElement as h} from 'react';
import {mount, shallow} from 'enzyme';
import {delayed} from '../delayed';

describe('delayed()', () => {
  it('is a function', () => {
    expect(typeof delayed).toBe('function');
  });

  it('returns a stateless component', () => {
    const Lazy = delayed({
      loader: () => Promise.resolve(() => null)
    });

    expect(Lazy).toBeInstanceOf(Function);
  });

  it('has .load() method', () => {
    const Lazy = delayed({
      loader: () => Promise.resolve(() => null)
    });

    expect(Lazy.load).toBeInstanceOf(Function);
  });

  it('renders nothing by default', () => {
    const Lazy = delayed({
      loader: () => Promise.resolve(() => null)
    });
    const wrapper = mount(h(Lazy));

    expect(Boolean(wrapper.html())).toBe(false);
  });

  it('renders loading placeholder', () => {
    const Lazy = delayed({
      loading: h('span', {}, 'Loading...'),
      loader: () => Promise.resolve(() => null)
    });
    const wrapper = mount(h(Lazy));

    expect(wrapper.find('span').html()).toBe('<span>Loading...</span>');
  });

  it('loads and renders actual implementation after first render', () => {
    const Implementation = () => h('div', {}, 'IMPLEMENTATION');
    const Lazy = delayed({
      loader: () => Promise.resolve(Implementation),
      delay: 1
    });

    const wrapper = mount(h(Lazy));

    expect(Boolean(wrapper.html())).toBe(false);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          wrapper.update();
          expect(wrapper.find('div').html()).toBe('<div>IMPLEMENTATION</div>');

          resolve();
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  });

  it('does pass through children', () => {
    const Implementation = (props) => h('div', {}, props.children);
    const Lazy = delayed({
      delay: 10,
      loader: () => Promise.resolve(Implementation),
    });

    const wrapper = mount(h(Lazy, {
      children: 'foobar'
    } as any));

    Lazy.load();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          wrapper.update();
          expect(wrapper.find('div').html()).toBe('<div>foobar</div>');
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  });
});
