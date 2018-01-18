import {mock} from '../mock';
import {Component, createElement as h} from 'react';
import {shallow, mount} from 'enzyme';

describe('mock()', () => {
  it('is a function', () => {
    expect(typeof mock).toBe('function');
  });

  it('return a React component', () => {
    const Mock = mock();

    expect(Mock.prototype).toBeInstanceOf(Component);
  });

  it('renders nothing by default', () => {
    const Mock = mock();
    const wrapper = shallow(h(Mock));

    expect(wrapper.html()).toBe(null);
  });

  it('renders loading placeholder', () => {
    const Mock = mock({
      loading: h('span', {}, 'Loading...')
    });
    const wrapper = shallow(h(Mock));

    expect(wrapper.html()).toBe('<span>Loading...</span>');
  });

  it('loading placeholder can be a component and receive props', () => {
    const Loading = (props) => h('div', {}, props.value);
    const Mock = mock({
      loading: Loading
    });

    const wrapper = mount(h(Mock, {
      value: 'foobar'
    }));

    expect(wrapper.html()).toBe('<div>foobar</div>');
  });

  it('provides .implement() method', () => {
    const Mock = mock();

    expect(typeof Mock.implement).toBe('function');
  });

  it('can implement mock', () => {
    const Mock = mock();
    const Implementation = () => h('div', {}, 'IMPLEMENTATION');
    const wrapper = mount(h(Mock));

    expect(wrapper.html()).toBe(null);

    Mock.implement(Implementation);

    expect(wrapper.html()).toBe('<div>IMPLEMENTATION</div>');
  });

  it('can re-implement mock many times', () => {
    const Mock = mock();
    const Implementation1 = () => h('div', {}, 'IMPLEMENTATION 1');
    const Implementation2 = () => h('div', {}, 'IMPLEMENTATION 2');
    const Implementation3 = () => h('div', {}, 'IMPLEMENTATION 3');
    const wrapper = mount(h(Mock));

    expect(wrapper.html()).toBe(null);

    Mock.implement(Implementation1);

    expect(wrapper.html()).toBe('<div>IMPLEMENTATION 1</div>');

    Mock.implement(Implementation2);

    expect(wrapper.html()).toBe('<div>IMPLEMENTATION 2</div>');

    Mock.implement(Implementation3);

    expect(wrapper.html()).toBe('<div>IMPLEMENTATION 3</div>');
  });

  it('does not throw when calling .implement() on un-mounted component', () => {
    const Mock = mock();
    const Implementation1 = () => h('div', {}, 'IMPLEMENTATION 1');
    const Implementation2 = () => h('div', {}, 'IMPLEMENTATION 2');
    const wrapper = mount(h(Mock));

    expect(wrapper.html()).toBe(null);

    Mock.implement(Implementation1);

    expect(wrapper.html()).toBe('<div>IMPLEMENTATION 1</div>');

    wrapper.unmount();

    Mock.implement(Implementation2);
  });

  it('does pass children', () => {
    const Mock = mock();
    const Implementation = (props) => h('div', {}, props.children);

    Mock.implement(Implementation);

    const wrapper = mount(h(Mock, {
      children: 'foobar'
    } as any));

    expect(wrapper.find('div').html()).toBe('<div>foobar</div>');
  });
});
