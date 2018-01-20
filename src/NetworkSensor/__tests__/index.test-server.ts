import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {NetworkSensor} from '..';

describe('<NetworkSensor> SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(h(NetworkSensor, {},
      (matches) => h('div', {}, 'foobar')
    ));
  });

  it('has expected server-side values', () => {
    const html = renderToStaticMarkup(h(NetworkSensor, {},
      ({online, since}) => {
        expect(online).to.equal(true);
        expect(since).to.equal(undefined);

        return null;
      }
    ));
  });
});
