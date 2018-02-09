import {Component} from 'react';
import {h, ns} from '../util';
import {Provider, Consumer} from '../context';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';

export interface ITranslationsProps {
  map: {[key: string]: string | ((...args) => string)};
  ns?: string;
}

export interface ITranslationsState {
}

export class Translations extends Component<ITranslationsProps, ITranslationsState> {
  render () {
    const {children, map: value} = this.props;

    return h(Provider as any, {
      name: ns(`T/${this.props.ns}`),
      value
    }, children);
  }
}

export interface ITranslateProps {
  ns?: string;
}

export interface ITranslateState {
}

export class Translate extends Component<ITranslateProps, ITranslateState> {
  render () {
    return h(Consumer, {name: ns(`T/${this.props.ns}`)}, (map) => {
      const T = (key, ...args) => {
        const value = map[key];

        if (typeof value === 'function') {
          return value(T, ...args);
        }

        return value || key;
      };

      return renderProp(this.props, T);
    });
  }
}

export const T = Translate;

export const withT = faccToHoc(Translate, 'T');
