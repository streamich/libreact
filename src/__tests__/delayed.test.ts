import {Component, createElement as h} from 'react';
import {mount, shallow} from 'enzyme';
import {delayed} from '../delayed';

describe('delayed()', () => {
  it('is a function', () => {
    expect(typeof delayed).toBe('function');
  });

  it('returns a stateless component', () => {
    const Delayed = delayed({
      loader: () => Promise.resolve(() => null)
    });

    expect(Delayed).toBeInstanceOf(Function);
  });

  it('has .load() method', () => {
    const Delayed = delayed({
      loader: () => Promise.resolve(() => null)
    });

    expect(Delayed.load).toBeInstanceOf(Function);
  });

  it('renders nothing by default', () => {
    const Delayed = delayed({
      loader: () => Promise.resolve(() => null)
    });
    const wrapper = mount(h(Delayed));

    expect(Boolean(wrapper.html())).toBe(false);
  });

  it('renders loading placeholder', () => {
    const Delayed = delayed({
      loading: h('span', {}, 'Loading...'),
      loader: () => Promise.resolve(() => null)
    });
    const wrapper = mount(h(Delayed));

    expect(wrapper.find('span').html()).toBe('<span>Loading...</span>');
  });

  it('loads and renders actual implementation after first render', () => {
    const Implementation = () => h('div', {}, 'IMPLEMENTATION');
    const Delayed = delayed({
      loader: () => Promise.resolve(Implementation),
      delay: 1,
      idle: true
    });

    const wrapper = mount(h(Delayed));

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
    const Delayed = delayed({
      delay: 10,
      idle: true,
      loader: () => Promise.resolve(Implementation),
    });

    const wrapper = mount(h(Delayed, {
      children: 'foobar'
    } as any));

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

  it('waits for DRAF after loaded', () => {
    return new Promise((resolve, reject) => {
      let wrapper;

      const Implementation = () => h('div', {}, 'IMPLEMENTATION');
      const Delayed = delayed({
        loader: () => new Promise((resolve2, reject2) => {
          setImmediate(() => {
            resolve2(Implementation);

            wrapper.update();

            try {
              expect(Boolean(wrapper.html())).toBe(false);
            } catch (error) {
              reject(error);
            }

            setTimeout(() => {
              wrapper.update();

              try {
                expect(Boolean(wrapper.html())).toBe(false);
              } catch (error) {
                reject(error);
              }

              setTimeout(() => {
                wrapper.update();

                try {
                  expect(wrapper.find('div').html()).toBe('<div>IMPLEMENTATION</div>');
                } catch (error) {
                  reject(error);
                }

                resolve();
              }, 50);
            }, 10);
          });
        }),
        delay: 0,
        idle: false,
        draf: true
      });

      wrapper = mount(h(Delayed));
    });
  });
});
