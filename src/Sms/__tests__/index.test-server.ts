import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Sms} from '..';

describe('<Sms> SSR', () => {
  it('renders without crashing as expected', () => {
    const html = renderToStaticMarkup(h(Sms, {
      phone: '123',
      body: 'foobar'
    }));

    expect(html).to.equal('<a href="sms:123?body=foobar"></a>');
  });
});
