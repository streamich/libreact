import {Component} from 'react';
import {noop} from '../util';
import renderProp from '../util/renderProp';
import {faccToHocInit} from '../Value';

export interface IFormValues {
  [key: string]: any;
}

export interface IFormProps {
  children?: (form: IFormBag) => React.ReactElement<any>;
  render?: (form: IFormBag) => React.ReactElement<any>;
  init?: IFormValues;
  onChange?: (values: IFormValues, name: string, value: any) => void;
  onSubmit?: (values: IFormValues, event?: any) => void;
  onReset?: (values: IFormValues) => void;
}

export interface IFormState {
  values: IFormValues;
}

export interface IFormField {
  name: string;
  value?: any;
  checked?: boolean;
  onChange: (eventOrValue: any) => void;
}

export interface IFormBag {
  values: IFormValues;
  get: (name?: string) => any;
  set: (name: string, value: any) => void;
  field: (name: string) => IFormField;
  reset: () => void;
  submit: (event?: any) => void;
}

const getInputValue = (eventOrValue) => {
  const target = eventOrValue && eventOrValue.target;

  if (!target) {
    return eventOrValue;
  }

  return target.type === 'checkbox' ? target.checked : target.value;
};

export class Form extends Component<IFormProps, IFormState> {
  static defaultProps = {
    init: {},
    onChange: noop,
    onSubmit: noop,
    onReset: noop
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      values: {...props.init}
    };

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.field = this.field.bind(this);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
  }

  get (name?: string) {
    return typeof name === 'undefined' ? this.state.values : this.state.values[name];
  }

  set (name, value) {
    this.setState(({values}) => ({
      values: {
        ...values,
        [name]: value
      }
    }), () => {
      this.props.onChange(this.state.values, name, value);
    });
  }

  field (name: string): IFormField {
    const value = this.get(name);
    const isBoolean = typeof value === 'boolean';

    return {
      name,
      value: isBoolean ? undefined : (typeof value === 'undefined' ? '' : value),
      checked: isBoolean ? value : undefined,
      onChange: (eventOrValue) => this.set(name, getInputValue(eventOrValue))
    };
  }

  reset () {
    const values = {...this.props.init};

    this.setState({values}, () => {
      this.props.onReset(this.state.values);
    });
  }

  submit (event?) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.props.onSubmit(this.state.values, event);
  }

  render () {
    const form: IFormBag = {
      values: this.state.values,
      get: this.get,
      set: this.set,
      field: this.field,
      reset: this.reset,
      submit: this.submit
    };

    return renderProp(this.props, form);
  }
}

export const withForm = faccToHocInit(Form, 'form');
