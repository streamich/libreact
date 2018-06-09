import * as React from 'react';
import faccToHoc from '../util/faccToHoc';

const contexts = {};

const getOrCreateContext = (name: string) => {
  let context = contexts[name];

  if (!context) {
    context = contexts[name] = React.createContext({});
  }

  return context;
};

export type TValue = {[key: string]: any};

export interface IProviderProps {
  value: any;
  children?: any;
  name?: string;
}

export interface IProviderState {
}

export class Provider extends React.Component<IProviderProps, IProviderState> {
  static defaultProps = {
    name: 'default',
  };

  render () {
    const {name, value, children} = this.props;
    const {Provider} = getOrCreateContext(name);

    return React.createElement(Provider, {value}, children || null);
  }
}

export interface IConsumerProps {
  children?: (value) => React.ReactElement<any>;
  name: string;
}

export interface IConsumerState {
  value;
}

export class Consumer extends React.Component<IConsumerProps, IConsumerState> {
  render() {
    const {name, children} = this.props;

    if (process.env.NODE_ENV !== 'production') {
      if (!name || (typeof name !== 'string')) {
        throw new TypeError('context/Consumer name prop should be a string');
      }
    }

    const context = contexts[name];

    if (!context) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`Context "${name}" does not have a provider.`);
      }

      return null;
    }

    return React.createElement(context.Consumer, {}, children);
  }
}

export const withContext = faccToHoc(Consumer, '');
