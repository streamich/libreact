/**
 * @jest-environment node
 */

import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Provider, Consumer} from '..';

describe('<BatterySensor> SSR', () => {
  it('renders without crashing with no value', () => {
    const element = (
      <Provider name="theme" value={{color: 'red'}}>
        <Consumer name="theme">{(theme) => {
            return <div>Color is: {theme.color}</div>;
        }}</Consumer>
    </Provider>
    );
    const html = renderToStaticMarkup(element);

    expect(html).toBe('<div>Color is: red</div>');
  });

  it('<Provider/> passes context to <Consumer/>', () => {
    const value = {foo: 'bar'};
    const jsx = h(
      Provider,
      {name: 'a', value},
      h(Consumer, {name: 'a'}, val => {
        return h('div', {}, val.foo);
      })
    );
    const html = renderToStaticMarkup(jsx);

    expect(html).toBe('<div>bar</div>');
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

    const html = renderToStaticMarkup(jsx);

    expect(html).toBe('<div>bar2bar</div>');
  });
});
