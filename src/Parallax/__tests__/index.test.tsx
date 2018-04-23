import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {Parallax} from '..';
import {getElRect, getRootRect} from '../../ViewportScrollSensor';

jest.mock('../../ViewportScrollSensor');

(getElRect as any).mockImplementation(() => [0, 2000, 0, 2100]);
(getRootRect as any).mockImplementation(() => [0, 0, 1000, 1000]);

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('<Parallax>', () => {
  it('exists', () => {
    expect(typeof Parallax).toBe('function');
  });

  it('default value is 0', () => {
    mount(
      <Parallax>{(data) => {
        expect(data.value).toBe(0);
        return <div>foobar</div>;
      }}</Parallax>
    );
  });

  it('calculates correct value', async () => {
    const datas = [];
    const wrapper = mount(
      <Parallax>{(data) => {
        datas.push(data);
        return <div>foobar</div>;
      }}</Parallax>
    );

    await delay(100);

    (getElRect as any).mockImplementation(() => [0, 500, 0, 600]);

    wrapper.instance().onScroll();

    wrapper.update();

    expect(datas.length).toBe(2);

    const last = datas[datas.length - 1];

    expect(last.distance).toBe(1100);
    expect(last.travelled).toBe(500);
    expect(last.value.toFixed(2)).toBe((500 / 1100).toFixed(2));
  });

  it('when moves past element, value is 1', async () => {
    const datas = [];
    const wrapper = mount(
      <Parallax>{(data) => {
        datas.push(data);
        return <div>foobar</div>;
      }}</Parallax>
    );

    (getElRect as any).mockImplementation(() => [0, -200, 0, -100]);

    await delay(100);

    wrapper.instance().onScroll();

    wrapper.update();

    const last = datas[datas.length - 1];

    expect(last.value).toBe(1);
  });
});
