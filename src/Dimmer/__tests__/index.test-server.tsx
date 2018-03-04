import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Dimmer} from '..';

describe('<Dimmer> SSR', () => {
  it('renders without crashing with no value', () => {
    const html = renderToStaticMarkup(h(Dimmer));
  });
});
