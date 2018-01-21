import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetTantek from '..';

describe('<CssResetTantek>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetTantek));

    expect(html).toMatchSnapshot();
  });
});
