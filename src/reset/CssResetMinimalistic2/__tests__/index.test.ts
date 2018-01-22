import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetMinimalistic2 from '..';

describe('<CssResetMinimalistic2>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetMinimalistic2));

    expect(html).toMatchSnapshot();
  });
});
