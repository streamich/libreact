import {loadable} from '../loadable';
import {Component, createElement as h} from 'react';
import {shallow, mount} from 'enzyme';

declare const Promise;

describe('loadable()', () => {
  it('is a function', () => {
    expect(typeof loadable).toBe('function');
  });

  it('return a stateless component', () => {
    const Loadable = loadable({
      loader: Promise.resolve(() => null)
    });

    expect(Loadable).toBeInstanceOf(Function);
  });

  it('renders nothing by default', () => {
    const Loadable = loadable({
      loader: Promise.resolve(() => null)
    });
    const wrapper = shallow(h(Loadable));

    expect(Boolean(wrapper.html())).toBe(false);
  });

  it('renders loading placeholder', () => {
    const Loadable = loadable({
      loader: Promise.resolve(() => null),
      loading: h('span', {}, 'Loading...')
    });
    const wrapper = mount(h(Loadable));

    expect(wrapper.find('span').html()).toBe('<span>Loading...</span>');
  });

  it('provides .load() method', () => {
    const Loadable = loadable({
      loader: Promise.resolve(() => null)
    });

    expect(typeof Loadable.load).toBe('function');
  });

  it('loads implementation', () => {
    const Implementation = () => h('div', {}, 'IMPLEMENTATION');
    const Loadable = loadable({
      loader: () => Promise.resolve(Implementation),
    });
    const wrapper = mount(h(Loadable));

    expect(wrapper.html()).toBe(null);

    Loadable.load();

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

  it('make .implement() to look for default exports, when using import()', () => {
    const Implementation = () => h('div', {}, 'IMPLEMENTATION');
    const Loadable = loadable({
      loader: () => Promise.resolve({default: Implementation}),
    });
    const wrapper = mount(h(Loadable));

    expect(wrapper.html()).toBe(null);

    Loadable.load();

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

  it('does pass children', () => {
    const Implementation = (props) => h('div', {}, props.children);
    const Loadable = loadable({
      loader: () => Promise.resolve(Implementation),
    });

    const wrapper = mount(h(Loadable, {
      children: 'foobar'
    } as any));

    Loadable.load();

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
