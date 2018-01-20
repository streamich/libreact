import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Battery} from '..';

describe('<Battery> SSR', () => {
  it('renders without crashing with no value', () => {
    const html = renderToStaticMarkup(h(Battery, {},
      (battery) => h('div', {}, String(battery))
    ));

    expect(html).to.equal('<div>null</div>');
  });
});
