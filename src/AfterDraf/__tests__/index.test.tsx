import {createElement as h} from 'react';
import {shallow} from 'enzyme';
import {AfterDraf} from '..';

const isClient = typeof window === 'object';
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('<AfterDraf>', () => {
  it('default <AfterDraf> exists', () => {
    expect(typeof AfterDraf).toBe('function');
  });

  it('waits for DRAF on client before rendering', async () => {
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

  it('waits for DRAF every mount', async () => {
    shallow(
      <AfterDraf>
        <div>foobar</div>
      </AfterDraf>
    );

    await sleep(100);

    const wrapper2 = shallow(
      <AfterDraf>
        <div>bazooka</div>
      </AfterDraf>
    );

    if (isClient) {
      expect(wrapper2.html()).toBe(null);
    } else {
      expect(wrapper2.html()).toBe('<div>bazooka</div>');
    }

    await sleep(100);

    wrapper2.update();

    expect(wrapper2.html()).toBe('<div>bazooka</div>');
  });
});
