import {createElement as h} from 'react';
import {shallow} from 'enzyme';
import createSingleRunDraf from '../createSingleRunDraf';

const isClient = typeof window === 'object';
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('createSingleRunDraf()', () => {
  it('factory works', () => {
    expect(typeof createSingleRunDraf).toBe('function');

    const AfterDraf = createSingleRunDraf();

    expect(typeof AfterDraf).toBe('function');
  });

  it('waits for DRAF on client before rendering', async () => {
    const AfterDraf = createSingleRunDraf();
    const wrapper = shallow(
      <AfterDraf>
        <div>foobar</div>
      </AfterDraf>
    );

    if (isClient) {
      expect(wrapper.html()).toBe(null);
    } else {
      expect(wrapper.html()).toBe('<div>foobar</div>');
    }

    await sleep(100);

    wrapper.update();

    expect(wrapper.html()).toBe('<div>foobar</div>');
  });

  it('does not wait for DRAF for the second time', async () => {
    const AfterDraf = createSingleRunDraf();
    const wrapper = shallow(
      <AfterDraf>
        <div>foobar</div>
      </AfterDraf>
    );

    await sleep(100);

    wrapper.update();

    expect(wrapper.html()).toBe('<div>foobar</div>');

    const wrapper2 = shallow(
      <AfterDraf>
        <div>bazooka</div>
      </AfterDraf>
    );

    if (isClient) {
      expect(wrapper.html()).toBe('<div>foobar</div>');
    } else {
      expect(wrapper.html()).toBe('<div>foobar</div>');
    }
  });
});
