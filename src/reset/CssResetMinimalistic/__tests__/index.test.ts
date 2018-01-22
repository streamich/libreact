import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetMinimalistic from '..';

describe('<CssResetMinimalistic>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetMinimalistic));

    expect(html).toMatchSnapshot();
  });
});
