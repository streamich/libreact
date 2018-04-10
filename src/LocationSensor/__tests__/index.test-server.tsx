import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {LocationSensor} from '..';

describe('<LocationSensor> SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(
      <LocationSensor>{() =>
        <div>foo</div>
      }</LocationSensor>
    );

    expect(html).to.equal('<div>foo</div>');
  });

  it('returns expected state', () => {
    renderToStaticMarkup(
      <LocationSensor>{(location) => {
        expect(location).to.eql({
          trigger: 'load',
          length: 1
        });

        return null;
      }}</LocationSensor>
    );
  });
});
