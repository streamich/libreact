import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Mailto} from '..';

describe('<Mailto> SSR', () => {
  it('renders without crashing as expected', () => {
    const html = renderToStaticMarkup(h(Mailto, {
      email: 'foo@bar.baz',
      subject: 'Hello'
    }));

    expect(html).to.equal('<a href="mailto:foo@bar.baz?subject=Hello&amp;body="></a>');
  });
});
