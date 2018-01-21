import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetMinimalistic3 from '..';

describe('<CssResetMinimalistic3>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetMinimalistic3));

    expect(html).toMatchSnapshot();
  });
});
