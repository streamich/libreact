import {createElement as h} from 'react';
import {shallow} from 'enzyme';
import {createAfterDraf, AfterDraf} from '..';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('<AfterDraf>', () => {
  it('factory works', () => {
    expect(typeof createAfterDraf).toBe('function');

    const AfterDraf = createAfterDraf();

    expect(typeof AfterDraf).toBe('function');
  });

  it('default <AfterDraf> exists', () => {
    expect(typeof AfterDraf).toBe('function');
  });

  it('waits for DRAF on client before rendering', async () => {
    const wrapper = shallow(
      <AfterDraf>
        <div>foobar</div>
      </AfterDraf>
    );

    expect(wrapper.html()).toBe(null);

    await sleep(100);

    wrapper.update();

    expect(wrapper.html()).toBe('<div>foobar</div>');
  });
});
