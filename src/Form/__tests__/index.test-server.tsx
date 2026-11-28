import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Form, Field} from '..';

describe('<Form> SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(h(Form as any, {}, () => null));

    expect(html).to.equal('');
  });

  it('renders children content', () => {
    const html = renderToStaticMarkup(
      h(Form as any, {}, () => h('div', null, 'form-content'))
    );

    expect(html).to.equal('<div>form-content</div>');
  });

  it('<Field> renders nothing without a form', () => {
    const html = renderToStaticMarkup(h(Field as any, {name: 'foo'}));

    expect(html).to.equal('');
  });
});
