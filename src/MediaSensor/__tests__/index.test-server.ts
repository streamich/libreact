import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {MediaSensor} from '..';

describe('<MediaSensor> SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(h(MediaSensor, {query: '(min-width: 480px)'},
      () => h('div', {}, 'foobar')
    ));

    expect(html).to.equal('<div>foobar</div>');
  });

  it('by default returns false', () => {
    const html = renderToStaticMarkup(h(MediaSensor, {query: '(min-width: 480px)'},
      ({matches}) => h('div', {}, String(matches))
    ));

    expect(html).to.equal('<div>false</div>');
  });

  describe('can specify default value', () => {
    it('false', () => {
      const html = renderToStaticMarkup(h(MediaSensor, {
        matches: false,
        query: '(min-width: 480px)'
      },
        ({matches}) => h('div', {}, String(matches))
      ));

      expect(html).to.equal('<div>false</div>');
    });

    it('true', () => {
      const html = renderToStaticMarkup(h(MediaSensor, {
        matches: true,
        query: '(min-width: 480px)'
      },
        ({matches}) => h('div', {}, String(matches))
      ));

      expect(html).to.equal('<div>true</div>');
    });
  });
});
