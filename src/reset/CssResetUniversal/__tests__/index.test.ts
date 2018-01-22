import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetUniversal from '..';

describe('<CssResetUniversal>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetUniversal));

    expect(html).toMatchSnapshot();
  });
});
