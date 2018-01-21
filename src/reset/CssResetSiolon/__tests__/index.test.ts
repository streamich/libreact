import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetSiolon from '..';

describe('<CssResetSiolon>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetSiolon));

    expect(html).toMatchSnapshot();
  });
});
