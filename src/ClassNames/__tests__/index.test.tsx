import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {ClassNames} from '..';

describe('<ClassNames>', () => {
  it('is a component', () => {
    expect(ClassNames).toBeDefined();
  });

  it('puts a single class name on <body>', () => {
    expect(document.body.classList.contains('foo')).toBe(false);

    const length = document.body.classList.length;
    const wrapper = mount(<ClassNames list={['foo']} />);

    expect(document.body.classList.contains('foo')).toBe(true);
    expect(document.body.classList.length).toBe(length + 1);

    wrapper.unmount();
  });

  it('sets multiple class names <body>', () => {
    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);
    expect(document.body.classList.contains('baz')).toBe(false);

    const length = document.body.classList.length;
    const wrapper = mount(<ClassNames list={['foo', 'bar', 'baz']} />);

    expect(document.body.classList.contains('foo')).toBe(true);
    expect(document.body.classList.contains('bar')).toBe(true);
    expect(document.body.classList.contains('baz')).toBe(true);
    expect(document.body.classList.length).toBe(length + 3);

    wrapper.unmount();
  });

  it('removes class names after un-mount', () => {
    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);

    const wrapper = mount(<ClassNames list={['foo', 'bar']} />);

    expect(document.body.classList.contains('foo')).toBe(true);
    expect(document.body.classList.contains('bar')).toBe(true);

    wrapper.unmount();

    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);
  });

  it('does not remove class names when persist= prop set', () => {
    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);

    const wrapper = mount(<ClassNames persist list={['foo', 'bar']} />);

    expect(document.body.classList.contains('foo')).toBe(true);
    expect(document.body.classList.contains('bar')).toBe(true);

    wrapper.unmount();

    expect(document.body.classList.contains('foo')).toBe(true);
    expect(document.body.classList.contains('bar')).toBe(true);

    document.body.className = '';
  });

  it('dynamically changes class list on update', () => {
    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);

    const wrapper = mount(<ClassNames list={['foo', 'bar']} />);

    expect(document.body.classList.contains('foo')).toBe(true);
    expect(document.body.classList.contains('bar')).toBe(true);

    wrapper.setProps({
      list: ['foo']
    });

    expect(document.body.classList.contains('foo')).toBe(true);
    expect(document.body.classList.contains('bar')).toBe(false);

    wrapper.setProps({
      list: ['baz', 'bazooka']
    });

    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);
    expect(document.body.classList.contains('baz')).toBe(true);
    expect(document.body.classList.contains('bazooka')).toBe(true);

    wrapper.unmount();

    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);
    expect(document.body.classList.contains('baz')).toBe(false);
    expect(document.body.classList.contains('bazooka')).toBe(false);
  });

  it('sets class names on custom element', () => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);
    expect(div.classList.contains('foo')).toBe(false);
    expect(div.classList.contains('bar')).toBe(false);

    const wrapper = mount(<ClassNames el={div} list={['foo', 'bar']} />);

    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);
    expect(div.classList.contains('foo')).toBe(true);
    expect(div.classList.contains('bar')).toBe(true);

    wrapper.unmount();

    expect(document.body.classList.contains('foo')).toBe(false);
    expect(document.body.classList.contains('bar')).toBe(false);
    expect(div.classList.contains('foo')).toBe(false);
    expect(div.classList.contains('bar')).toBe(false);

    document.body.removeChild(div);
  });
});
