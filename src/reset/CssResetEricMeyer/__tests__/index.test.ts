import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetEricMeyer from '..';

describe('<CssResetEricMeyer>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetEricMeyer));

    expect(html).toMatchSnapshot();
  });
});
