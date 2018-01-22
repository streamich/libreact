import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import CssResetPoorMan from '..';

describe('<CssResetPoorMan>', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(CssResetPoorMan));

    expect(html).toMatchSnapshot();
  });
});
