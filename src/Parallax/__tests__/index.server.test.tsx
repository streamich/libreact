/** @jest-environment node */
import {createElement as h} from 'react';
import {renderToString} from 'react-dom/server';
import {Parallax} from '..';

describe('<Parallax> Server', () => {
  it('exists', () => {
    expect(typeof Parallax).toBe('function');
  });

  it('renders children', () => {
    const html = renderToString(
      <Parallax>
        <div>foobar</div>
      </Parallax>
    );

    expect(html.includes('foobar</div>')).toBe(true);

    const html2 = renderToString(
      <Parallax>{() =>
        <div>foobar</div>
      }</Parallax>
    );

    expect(html2.includes('foobar</div>')).toBe(true);
  });
});
