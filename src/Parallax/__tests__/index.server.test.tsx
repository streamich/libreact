/** @jest-environment node */
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Parallax} from '..';

describe('<Parallax> Server', () => {
  it('exists', () => {
    expect(typeof Parallax).toBe('function');
  });

  it('renders children', () => {
    const html = renderToStaticMarkup(
      <Parallax>
        <div>foobar</div>
      </Parallax>
    );

    expect(html.includes('foobar</div>')).toBe(true);

    const html2 = renderToStaticMarkup(
      <Parallax>{() =>
        <div>foobar</div>
      }</Parallax>
    );

    expect(html2.includes('foobar</div>')).toBe(true);
  });

  it('provides expected data', () => {
    const html = renderToStaticMarkup(
      <Parallax>{(data) => {

        expect(data).toMatchObject({
          value: 0,
          distance: Infinity,
          travelled: 0
        });

        return <div>value: {data.value}</div>;
      }}</Parallax>
    );

    expect(html.includes('value: 0</div>')).toBe(true);

    renderToStaticMarkup(
      <Parallax distance={300}>{(data) => {

        expect(data).toMatchObject({
          distance: 300
        });

        return <div>value: {data.value}</div>;
      }}</Parallax>
    );
  });

  it('throws on invalid children in development mode', () => {
    const mode = process.env.NODE_ENV;

    process.env.NODE_ENV = 'development';

    const Comp = () => <div>foobar</div>;
    const render = () => renderToStaticMarkup(
      <Parallax>{() => <Comp />}</Parallax>
    );

    expect(render).toThrowErrorMatchingSnapshot();

    process.env.NODE_ENV = 'production';

    expect(render).not.toThrow();

    process.env.NODE_ENV = mode;
  });
});
