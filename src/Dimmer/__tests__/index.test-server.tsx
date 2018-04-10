import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Dimmer} from '..';

describe('<Dimmer> SSR', () => {
  it('renders without crashing with no value', () => {
    renderToStaticMarkup(h(Dimmer));
  });
});
