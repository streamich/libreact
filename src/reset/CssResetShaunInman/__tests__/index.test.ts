import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetShaunInman from '..';

describe('<CssResetShaunInman>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetShaunInman));

    expect(html).toMatchSnapshot();
  });
});
