import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {MediaSensor} from '..';

describe('<MediaSensor> SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(h(MediaSensor, {query: '(min-width: 480px)'},
      (matches) => h('div', {}, 'foobar')
    ));

    expect(html).to.equal('<div>foobar</div>');
  });
});
