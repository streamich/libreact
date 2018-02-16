import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {CssVarsProvider, CssVars} from '..';

describe('<CssVars> SSR', () => {
  it('renders as expected without crashing', () => {
    const element = (
      <CssVarsProvider vars={{
        color: 'tomato',
        border: '1px solid tomato'
      }}>
        <CssVars>{(vars) =>
          <div>
            {JSON.stringify(vars)}
          </div>
        }</CssVars>
      </CssVarsProvider>
    );
    const html = renderToStaticMarkup(element);

    expect(html).to.equal('<div>{&quot;color&quot;:&quot;tomato&quot;,&quot;border&quot;:&quot;1px solid tomato&quot;}</div>');
  });
});
