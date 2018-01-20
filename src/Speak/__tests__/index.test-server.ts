import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Speak} from '..';

describe('<Speak> SSR', () => {
  it('renders nothing without crashing', () => {
    const html = renderToStaticMarkup(h(Speak, {text: 'hello'}));

    expect(html).to.equal('');
  });
});
