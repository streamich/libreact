import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {LocalStorage} from '..';

describe('<LocalStorage> SSR', () => {
  it('renders without crashing with no value', () => {
    const html = renderToStaticMarkup(h(LocalStorage, {
      name: 'foo',
      data: 'bar'
    }));

    expect(html).to.equal('');
  });
});
