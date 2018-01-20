import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Provider, Consumer} from '..';

describe('<BatterySensor> SSR', () => {
  it('renders without crashing with no value', () => {
    const element = (
      <Provider name="theme" value={{color: 'red'}}>
        <Consumer name="theme">{(theme) => {
            return <div>Color is: {theme.color}</div>;
        }}</Consumer>
    </Provider>
    );
    const html = renderToStaticMarkup(element);

    expect(html).to.equal('<div>Color is: red</div>');
  });
});
