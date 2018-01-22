import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Vibrate} from '..';

describe('<Vibrate> SSR', () => {
  it('renders nothing without crashing', () => {
    const html = renderToStaticMarkup(h(Vibrate, {ms: 300}));

    expect(html).to.equal('');
  });
});
