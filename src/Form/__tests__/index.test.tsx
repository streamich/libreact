import {h} from '../../util';
import {mount} from 'enzyme';
import {Form, withForm} from '..';

describe('<Form>', () => {
  it('is a component', () => {
    expect(Form).toBeInstanceOf(Function);
  });

  it('exposes initial values', () => {
    mount(
      <Form init={{email: 'hello@example.com'}}>
        {({values, get}) => {
          expect(values).toEqual({email: 'hello@example.com'});
          expect(get('email')).toBe('hello@example.com');
          expect(get()).toEqual({email: 'hello@example.com'});

          return null;
        }}
      </Form>
    );
  });

  it('uses the render prop', () => {
    const render = jest.fn(() => null);

    mount(h(Form, {
      init: {email: 'hello@example.com'},
      render
    }));

    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      values: {email: 'hello@example.com'}
    }));
  });

  it('sets field values', () => {
    let form;
    const onChange = jest.fn();

    mount(
      <Form init={{email: ''}} onChange={onChange}>
        {(props) => {
          form = props;

          return null;
        }}
      </Form>
    );

    form.set('email', 'hello@example.com');

    expect(form.get('email')).toBe('hello@example.com');
    expect(onChange).toHaveBeenCalledWith(
      {email: 'hello@example.com'},
      'email',
      'hello@example.com'
    );
  });

  it('binds text input fields', () => {
    const wrapper = mount(
      <Form init={{email: ''}}>
        {({field}) => <input type="email" {...field('email')} />}
      </Form>
    );

    const input = wrapper.find('input');

    expect(input.prop('name')).toBe('email');
    expect(input.prop('value')).toBe('');

    input.simulate('change', {
      target: {
        value: 'hello@example.com'
      }
    });

    expect(wrapper.find('input').prop('value')).toBe('hello@example.com');
  });

  it('binds checkbox fields', () => {
    const wrapper = mount(
      <Form init={{remember: false}}>
        {({field}) => <input type="checkbox" {...field('remember')} />}
      </Form>
    );

    wrapper.find('input').simulate('change', {
      target: {
        type: 'checkbox',
        checked: true
      }
    });

    expect(wrapper.find('input').prop('checked')).toBe(true);
    expect(wrapper.find('input').prop('value')).toBeUndefined();
  });

  it('exports the form component from the package root', () => {
    const libreact = require('../../');

    expect(libreact.Form).toBe(Form);
  });

  it('submits current values', () => {
    let form;
    const onSubmit = jest.fn();
    const event = {
      preventDefault: jest.fn()
    };

    mount(
      <Form init={{email: ''}} onSubmit={onSubmit}>
        {(props) => {
          form = props;

          return null;
        }}
      </Form>
    );

    form.set('email', 'hello@example.com');
    form.submit(event);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      {email: 'hello@example.com'},
      event
    );
  });

  it('resets to initial values', () => {
    let form;
    const onReset = jest.fn();

    mount(
      <Form init={{email: 'initial@example.com'}} onReset={onReset}>
        {(props) => {
          form = props;

          return null;
        }}
      </Form>
    );

    form.set('email', 'changed@example.com');
    form.reset();

    expect(form.get('email')).toBe('initial@example.com');
    expect(onReset).toHaveBeenCalledWith({email: 'initial@example.com'});
  });

  it('injects a form object through withForm()', () => {
    const View = ({form}) => <span>{form.get('email')}</span>;
    const Enhanced = withForm(View, 'form', {email: 'hello@example.com'});
    const wrapper = mount(<Enhanced />);

    expect(wrapper.text()).toBe('hello@example.com');
  });
});
