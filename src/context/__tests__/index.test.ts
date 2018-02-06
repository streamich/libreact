import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {Consumer, Provider} from '../index';

describe('context', () => {
  it('<Provider/> passes context to <Consumer/>', () => {
    const value = {foo: 'bar'};
    const jsx = h(
      Provider,
      {name: 'a', value},
      h(Consumer, {name: 'a'}, val => {
        return h('div', {}, val.foo);
      })
    );
    const wrapper = mount(jsx);

    expect(wrapper.find('div').props().children).toBe('bar');
  });

  it('multiple <Provider/> contexts received by multiple <Consumer/>s', () => {
    const jsx = h(
      Provider,
      {name: 'a', value: {foo1: 'bar'}},
      h(
        Provider,
        {name: 'b', value: {foo2: 'bar2'}},
        h(Consumer, {name: 'b'}, val1 => {
          return h(Consumer, {name: 'a'}, val2 => {
            return h('div', {}, val1.foo2 + val2.foo1);
          });
        })
      )
    );

    const wrapper = mount(jsx);

    expect(wrapper.find('div').props().children).toBe('bar2bar');
  });

  it('<Provider/> merges multiple values with the same name', () => {
    const jsx = h(
      Provider,
      {name: 'theme', value: {color: '1', background: '2'}},
      h(
        Provider,
        {name: 'theme', value: {color: '2', size: '3'}},
        h(
          Provider,
          {
            name: 'theme',
            value: {color: '3', size: '4', hover: true},
          },
          h(Consumer, {name: 'theme'}, val => {
            expect(val).toEqual({
              hover: true,
              size: '4',
              color: '3',
              background: '2',
            });
            return null;
          })
        )
      )
    );
    mount(jsx);
  });
});
