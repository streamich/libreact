import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {NetworkSensor} from '..';

describe('<NetworkSensor> SSR', () => {
  it('renders without crashing', () => {
    renderToStaticMarkup(h(NetworkSensor, {},
      () => h('div', {}, 'foobar')
    ));
  });

  it('has expected server-side values', () => {
    renderToStaticMarkup(h(NetworkSensor, {},
      (net) => {
        const {online, since} = net;

        expect(online).to.equal(true);
        expect(since).to.equal(undefined);

        return null;
      }
    ));
  });
});
