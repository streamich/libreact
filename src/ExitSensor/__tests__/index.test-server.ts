import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {ExitSensor} from '..';

describe('<ExitSensor> SSR', () => {
  it('renders without crashing inner element', () => {
    const html = renderToStaticMarkup(h(ExitSensor, {},
      h('div', {}, 'foobar')
    ));

    expect(html).to.equal('<div>foobar</div>');
  });
});
