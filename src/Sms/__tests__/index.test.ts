import {mount} from 'enzyme';
import {h} from '../../util';
import {Sms} from '..';

describe('<Sms>', () => {
  it('is a component', () => {
    expect(Sms).toBeInstanceOf(Function);
  });

  it('renders as expected without body', () => {
    const wrapper = mount(h(Sms, {
      phone: '123'
    }));

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders as expected ', () => {
    const wrapper = mount(h(Sms, {
      phone: '123',
      body: 'Hello world'
    }));

    expect(wrapper.html()).toMatchSnapshot();
  });
});
