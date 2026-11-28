import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {Form, Field} from '..';

const required = (value) => (value ? undefined : 'required');

describe('<Form>', () => {
  it('exists', () => {
    expect(typeof Form).toBe('function');
    expect(typeof Field).toBe('function');
  });

  it('tracks input values through <Field>', () => {
    let formApi: any = null;
    const wrapper = mount(
      <Form init={{email: ''}}>
        {(form) => {
          formApi = form;
          return (
            <Field name="email">
              {({input}) => <input {...input} type="email"/>}
            </Field>
          );
        }}
      </Form>
    );

    wrapper.find('input').simulate('change', {target: {value: 'a@b.c'}});

    expect(formApi.values.email).toBe('a@b.c');
  });

  it('marks fields as touched on blur', () => {
    let formApi: any = null;
    const wrapper = mount(
      <Form init={{email: ''}}>
        {(form) => {
          formApi = form;
          return (
            <Field name="email">
              {({input}) => <input {...input}/>}
            </Field>
          );
        }}
      </Form>
    );

    expect(formApi.touched.email).toBeFalsy();
    wrapper.find('input').simulate('blur');
    expect(formApi.touched.email).toBe(true);
  });

  it('blocks submission while a field validator fails', () => {
    const onSubmit = jest.fn();
    let formApi: any = null;
    mount(
      <Form init={{email: ''}} onSubmit={onSubmit}>
        {(form) => {
          formApi = form;
          return (
            <Field name="email" validate={required}>
              {({input, meta}) => (
                <div>
                  <input {...input}/>
                  {meta.touched && meta.error ? <span className="error">{meta.error}</span> : null}
                </div>
              )}
            </Field>
          );
        }}
      </Form>
    );

    formApi.submit();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(formApi.errors.email).toBe('required');
  });

  it('submits valid values and exposes errors through meta', () => {
    const onSubmit = jest.fn();
    let formApi: any = null;
    mount(
      <Form init={{email: 'a@b.c'}} onSubmit={onSubmit}>
        {(form) => {
          formApi = form;
          return (
            <Field name="email" validate={required}>
              {({input}) => <input {...input}/>}
            </Field>
          );
        }}
      </Form>
    );

    formApi.submit();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({email: 'a@b.c'});
  });

  it('applies form-level validation', () => {
    const onSubmit = jest.fn();
    let formApi: any = null;
    mount(
      <Form
        init={{password: 'x', confirm: 'y'}}
        validate={(values) => (values.password === values.confirm ? {} : {confirm: 'mismatch'})}
        onSubmit={onSubmit}
      >
        {(form) => {
          formApi = form;
          return null;
        }}
      </Form>
    );

    formApi.submit();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(formApi.errors.confirm).toBe('mismatch');
  });

  it('reset restores initial values and clears errors and touched', () => {
    let formApi: any = null;
    mount(
      <Form init={{email: 'init'}}>
        {(form) => {
          formApi = form;
          return null;
        }}
      </Form>
    );

    formApi.setValue('email', 'changed');
    formApi.setTouched('email');
    formApi.setError('email', 'broken');
    formApi.reset();

    expect(formApi.values.email).toBe('init');
    expect(formApi.errors.email).toBeFalsy();
    expect(formApi.touched.email).toBeFalsy();
  });

  it('keeps submitting=true until async onSubmit resolves', async () => {
    let resolveSubmit: any;
    const onSubmit = jest.fn(() => new Promise((resolve) => { resolveSubmit = resolve; }));
    let formApi: any = null;
    mount(
      <Form init={{email: 'a@b.c'}} onSubmit={onSubmit}>
        {(form) => {
          formApi = form;
          return null;
        }}
      </Form>
    );

    formApi.submit();

    expect(formApi.submitting).toBe(true);

    resolveSubmit();
    await new Promise((resolve) => setTimeout(resolve));

    expect(formApi.submitting).toBe(false);
    expect(formApi.submitCount).toBe(1);
  });
});
