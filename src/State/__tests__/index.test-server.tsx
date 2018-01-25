import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {State} from '..';

describe('<State> SSR', () => {
  it('renders without crashing with the expected value', () => {
    const html = renderToStaticMarkup(h(State, {
      init: {
        foo: 'bar'
      },
      render: ({foo}) => <div>{foo}</div>
    }));

    expect(html).to.equal('<div>bar</div>');
  });
});
