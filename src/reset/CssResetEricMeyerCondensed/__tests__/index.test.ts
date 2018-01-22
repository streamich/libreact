import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetEricMeyerCondensed from '..';

describe('<CssResetEricMeyerCondensed>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetEricMeyerCondensed));

    expect(html).toMatchSnapshot();
  });
});
