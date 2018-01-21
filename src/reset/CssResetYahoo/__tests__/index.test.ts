import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetYahoo from '..';

describe('<CssResetYahoo>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetYahoo));

    expect(html).toMatchSnapshot();
  });
});
