import {mount} from 'enzyme';
import {h} from '../../util';
import {Mailto} from '..';

describe('<Mailto>', () => {
  it('is a component', () => {
    expect(Mailto).toBeInstanceOf(Function);
  });

  it('renders as expected with just e-mail', () => {
    const wrapper = mount(h(Mailto, {
      email: 'foo@bar.baz'
    }));

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders as expected ', () => {
    const wrapper = mount(h(Mailto, {
      email: 'foo@bar.baz',
      subject: 'Hello world',
      cc: ['foo.cc@bar.baz'],
      bcc: ['foo.bcc@bar.baz'],
      body: 'Hello world!'
    }, 'Click me'));

    expect(wrapper.html()).toMatchSnapshot();
  });
});
