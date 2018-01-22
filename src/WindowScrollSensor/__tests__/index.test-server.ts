import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {WindowScrollSensor} from '..';

describe('<WindowScrollSensor> SSR', () => {
  it('renders as expected', () => {
    const html = renderToStaticMarkup(h(WindowScrollSensor, {},
      ({x, y}) => h('div', {}, `${x}, ${y}`)
    ));

    expect(html).to.equal('<div>0, 0</div>');
  });
});
