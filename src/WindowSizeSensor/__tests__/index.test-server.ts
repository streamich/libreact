import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {WindowSizeSensor} from '..';

describe('<WindowSizeSensor> SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(h(WindowSizeSensor, {},
      ({width, height}) => h('div', {}, `${width}, ${height}`)
    ));

    expect(html).to.equal('<div>1920, 1080</div>');
  });
});
