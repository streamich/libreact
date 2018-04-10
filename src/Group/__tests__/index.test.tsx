import {createElement as h} from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {Group} from '..';

describe('<Group>', () => {
  it('exists', () => {
    expect(typeof Group).toBe('function');
  });

  it('works with no children', () => {
    const wrapper = mount(<Group></Group>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('can change element type', () => {
    const wrapper = mount(<Group as="span"></Group>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('passes through props', () => {
    const wrapper = mount(<Group className="foo"></Group>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('default separator is space', () => {
    const wrapper = mount(
      <Group>
        <span>Hello</span>
        <span>world</span>
      </Group>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('can set custom separator', () => {
    const wrapper = mount(
      <Group separator={<br />}>
        <span>Hello</span>
        <span>world</span>
      </Group>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});