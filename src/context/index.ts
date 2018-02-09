import {Component} from 'react';
import * as Types from 'prop-types';
import {h, ns, noop} from '../util';
import {IObservable, observable, TObservalbeUnsub} from './observable';
import faccToHoc from '../util/faccToHoc';

const $$context = ns('context');

export type TValue = {[key: string]: any};

export interface IProviderProps {
  children?: any;
  name: string;
  value: any;
}

export interface IProviderState {
}

export class Provider extends Component<IProviderProps, IProviderState> {
  static propTypes = {
    name: Types.string,
    value: Types.object.isRequired,
  };

  static defaultProps = {
    name: 'default',
  };

  static childContextTypes = {
    [$$context]: Types.object,
  };

  static contextTypes = {
    [$$context]: Types.object,
  };

  observable: IObservable<TValue>;
  parentUnsub: TObservalbeUnsub = noop;
  parentValue: TValue = null;

  componentWillMount() {
    const parentObservable = (this.context[$$context] || {})[this.props.name];
    if (parentObservable) {
      this.parentValue = parentObservable.get();
      this.parentUnsub = parentObservable.sub(value => {
        this.parentValue = value;
        this.observable.set(this.mergeValues(this.props.value));
      });
    }

    this.observable = observable(this.mergeValues(this.props.value));
  }

  getChildContext() {
    return {
      ...this.context,
      [$$context]: {
        ...(this.context[$$context] || {}),
        [this.props.name]: this.observable,
      },
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.value !== props.value) this.observable.set(this.mergeValues(props.value));
  }

  componentWillUnmount() {
    this.parentUnsub();
  }

  mergeValues(value) {
    return {...this.parentValue, ...value};
  }

  render () {
    return this.props.children || null;
  }
}

export interface IConsumerProps {
  children?: (value) => React.ReactElement<any>;
  name: string;
}

export interface IConsumerState {
  value;
}

export class Consumer extends Component<IConsumerProps, IConsumerState> {
  static propTypes = {
    name: Types.string.isRequired,
    children: Types.func.isRequired,
  };

  static contextTypes = {
    [$$context]: Types.object,
  };

  state = {
    value: null,
  };

  unsub: TObservalbeUnsub = noop;

  observable(): IObservable<TValue> {
    const observable = this.context[$$context][this.props.name];

    if (process.env.NODE_ENV !== 'production') {
      if (!observable) {
        throw new Error(`Context observable "${this.props.name}" not found.`);
      }
    }

    return observable;
  }

  componentWillMount() {
    this.setState({
      value: this.observable().get(),
    });
  }

  componentDidMount() {
    this.unsub = this.observable().sub(value => {
      this.setState({value});
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    return this.props.children(this.state.value);
  }
}

export const withContext = faccToHoc(Consumer, '');
