import React from 'react';
import faccToHoc from '../util/faccToHoc';

const contexts = {};

const getContext = (name: string) => {
  let context = contexts[name];

  if (!context) {
    context = contexts[name] = React.createContext();
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
    const {Provider} = getContext(name);

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
    const {Consumer} = getContext(name);

    return React.createElement(Consumer, {}, this.props.children);
  }
}

export const withContext = faccToHoc(Consumer, '');
