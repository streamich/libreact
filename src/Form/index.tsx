import * as React from 'react';
import renderProp from '../util/renderProp';
import {h, noop} from '../util';

export type TFormValues = {[name: string]: any};
export type TFormErrors = {[name: string]: string | undefined};
export type TFormTouched = {[name: string]: boolean | undefined};
export type TValidator = (value: any, values: TFormValues) => string | undefined;

export interface IFormApi {
  values: TFormValues;
  errors: TFormErrors;
  touched: TFormTouched;
  submitting: boolean;
  submitCount: number;
  setValue: (name: string, value: any) => void;
  setTouched: (name: string, isTouched?: boolean) => void;
  setError: (name: string, error?: string) => void;
  validate: () => TFormErrors;
  submit: () => void;
  reset: () => void;
  field: (name: string) => IFieldInput;
}

export interface IFormProps {
  init?: TFormValues;
  validate?: (values: TFormValues) => TFormErrors;
  onSubmit?: (values: TFormValues, form: IFormApi) => void | Promise<any>;
  children?: ((form: IFormApi) => React.ReactNode) | React.ReactNode;
  render?: (form: IFormApi) => React.ReactNode;
}

export interface IFormState {
  values: TFormValues;
  errors: TFormErrors;
  touched: TFormTouched;
  submitting: boolean;
  submitCount: number;
}

export interface IFormContext {
  form: Form | null;
}

const {Provider, Consumer} = React.createContext<IFormContext>({form: null});

export class Form extends React.Component<IFormProps, IFormState> {
  validators: {[name: string]: TValidator} = {};

  state: IFormState = {
    values: {...(this.props.init || {})},
    errors: {},
    touched: {},
    submitting: false,
    submitCount: 0,
  };

  registerValidator = (name: string, validator?: TValidator) => {
    if (validator) {
      this.validators[name] = validator;
    } else {
      delete this.validators[name];
    }
  };

  setValue = (name: string, value: any) => {
    this.setState((state) => ({
      values: {...state.values, [name]: value},
    }));
  };

  setTouched = (name: string, isTouched: boolean = true) => {
    this.setState((state) => ({
      touched: {...state.touched, [name]: isTouched},
    }));
  };

  setError = (name: string, error?: string) => {
    this.setState((state) => ({
      errors: {...state.errors, [name]: error},
    }));
  };

  validate = (): TFormErrors => {
    const {values} = this.state;
    let errors: TFormErrors = {};

    for (const name of Object.keys(this.validators)) {
      const error = this.validators[name](values[name], values);

      if (error) {
        errors[name] = error;
      }
    }

    if (this.props.validate) {
      errors = {...errors, ...this.props.validate(values)};
    }

    this.setState({errors});

    return errors;
  };

  submit = () => {
    const errors = this.validate();
    const touched: TFormTouched = {};

    for (const name of Object.keys(this.state.values)) {
      touched[name] = true;
    }
    this.setState({touched});

    if (Object.keys(errors).some((name) => !!errors[name])) {
      return;
    }

    this.setState((state) => ({submitting: true, submitCount: state.submitCount + 1}));

    const finish = () => this.setState({submitting: false});

    try {
      const result = (this.props.onSubmit || noop)(this.state.values, this.api());

      if (result && typeof (result as Promise<any>).then === 'function') {
        (result as Promise<any>).then(finish, finish);
      } else {
        finish();
      }
    } catch (error) {
      finish();
      throw error;
    }
  };

  reset = () => {
    this.setState({
      values: {...(this.props.init || {})},
      errors: {},
      touched: {},
      submitting: false,
    });
  };

  field = (name: string): IFieldInput => {
    return {
      name,
      value: this.state.values[name] == null ? '' : this.state.values[name],
      onChange: (eventOrValue: any) => {
        const value = eventOrValue && eventOrValue.target ? eventOrValue.target.value : eventOrValue;

        this.setValue(name, value);
      },
      onBlur: () => this.setTouched(name),
    };
  };

  api (): IFormApi {
    return {
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      submitting: this.state.submitting,
      submitCount: this.state.submitCount,
      setValue: this.setValue,
      setTouched: this.setTouched,
      setError: this.setError,
      validate: this.validate,
      submit: this.submit,
      reset: this.reset,
      field: this.field,
    };
  }

  render () {
    const api = this.api();

    return (
      <Provider value={{form: this}}>
        {renderProp(this.props, api)}
      </Provider>
    );
  }
}

export interface IFieldInput {
  name: string;
  value: any;
  onChange: (eventOrValue: any) => void;
  onBlur: () => void;
}

export interface IFieldMeta {
  error?: string;
  touched: boolean;
}

export interface IFieldRenderProps {
  input: IFieldInput;
  meta: IFieldMeta;
}

export interface IFieldProps {
  name: string;
  validate?: TValidator;
  children?: ((props: IFieldRenderProps) => React.ReactNode) | React.ReactNode;
  render?: (props: IFieldRenderProps) => React.ReactNode;
}

export class FieldInner extends React.Component<IFieldProps & {form: Form | null}> {
  componentDidMount () {
    this.register();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.name !== this.props.name || prevProps.validate !== this.props.validate) {
      this.register(prevProps.name);
      this.register();
    }
  }

  componentWillUnmount () {
    if (this.props.form) {
      this.props.form.registerValidator(this.props.name);
    }
  }

  register (name: string = this.props.name) {
    const {form} = this.props;

    if (form) {
      form.registerValidator(name, name === this.props.name ? this.props.validate : undefined);
    }
  }

  render () {
    const {form, name} = this.props;

    if (!form) {
      return null;
    }

    const state = form.state;
    const input = form.field(name);
    const meta: IFieldMeta = {
      error: state.errors[name],
      touched: !!state.touched[name],
    };

    return renderProp(this.props, {input, meta}) as any;
  }
}

export const Field: React.StatelessComponent<IFieldProps> = (props) => (
  <Consumer>
    {({form}) => <FieldInner {...props} form={form}/>}
  </Consumer>
);
