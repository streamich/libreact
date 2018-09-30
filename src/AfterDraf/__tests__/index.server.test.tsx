/** @jest-environment node */
import {createElement as h} from 'react';
import ReactDOMServer from 'react-dom/server';
import {AfterDraf} from '..';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('<AfterDraf>', () => {
  it('Renders children', async () => {
    const str = ReactDOMServer.renderToStaticMarkup(<AfterDraf>
        <div>foobar</div>
      </AfterDraf>);

    expect(str).toBe('<div>foobar</div>');
  });
});
