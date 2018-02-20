import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {expect} from 'chai';
import {Router, Route} from '..';

describe('route SSR', () => {
  it('renders without crashing', () => {
    const html = renderToStaticMarkup(
      <Router route='/foo/bar'>
        <Route>
          <span>baz</span>
        </Route>
      </Router>
    );

    expect(html).to.equal('<span>baz</span>');
  });

  it('renders matching routes', () => {
    const html = renderToStaticMarkup(
      <Router route='/foo/bar'>
        <Route>
          <span>1</span>
        </Route>
        <Route match='/baz'>
          <span>2</span>
        </Route>
        <Route match='/foo'>
          <span>3</span>
        </Route>
        <Route match='/foo/bar'>
          <span>4</span>
        </Route>
      </Router>
    );

    expect(html).to.equal('<span>1</span><span>3</span><span>4</span>');
  });

  it('matches partial step', () => {
    const html = renderToStaticMarkup(
      <Router route='/foo/bar'>
        <Route match='/foo/b'>
          <span>1</span>
        </Route>
      </Router>
    );

    expect(html).to.equal('<span>1</span>');
  });
});
