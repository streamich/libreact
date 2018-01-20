import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {BatterySensor} from '..';

describe('<BatterySensor> SSR', () => {
  it('renders without crashing with no value', () => {
    const html = renderToStaticMarkup(h(BatterySensor, {},
      (battery) => h('div', {}, String(battery))
    ));

    expect(html).to.equal('<div>null</div>');
  });
});
