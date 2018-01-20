import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Network} from '..';

describe('<Network> SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(h(Network, {},
      (matches) => h('div', {}, 'foobar')
    ));
  });

  it('has expected server-side values', () => {
    const html = renderToStaticMarkup(h(Network, {},
      ({online, since}) => {
        expect(online).to.equal(true);
        expect(since).to.equal(null);

        return null;
      }
    ));
  });
});
