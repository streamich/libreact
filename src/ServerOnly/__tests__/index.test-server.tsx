import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {ServerOnly} from '..';

describe('<ServerOnly> SSR', () => {
  it('renders its children as is', () => {
    const html = renderToStaticMarkup(h(ServerOnly, {},
      h('div', {}, 'foobar')
    ));

    expect(html).to.equal('<div>foobar</div>');
  });
});
