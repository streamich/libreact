import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {ClassNames} from '..';

describe('<ClassNames> SSR', () => {
  it('renders without crashing with no value', () => {
    const html = renderToStaticMarkup(h(ClassNames, {list: ['foobar']}));

    expect(html).to.equal('');
  });

  it('renders its children', () => {
    const html = renderToStaticMarkup(h(ClassNames, {list: ['foobar']}, h('div', null, 'foo')));

    expect(html).to.equal('<div>foo</div>');
  });
});
