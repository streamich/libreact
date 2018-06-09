import {Component} from 'react';
import {Consumer} from '../context';
import {h, ns} from '../util';
import {Link, ILinkProps} from '../Link';
import createMatcher, {TRouteMatcher} from './createMatcher';

export interface IGoParams {
  replace?: boolean;
  title?: string;
  state?: any;
}

export type TGo = (url: string, params: IGoParams) => void;

export const go = (url, {replace, title = '', state}: IGoParams = {}) => {
  history[replace ? 'replaceState' : 'pushState'](state, title || '', url);
};

export interface IGoProps extends ILinkProps {
  exact?: boolean;
  match?: TRouteMatcher | RegExp | string;
  ns?: string;
}

export interface IGoState {
}

export class Go extends Component<IGoProps, IGoState> {
  render () {
    return h(Consumer, {name: ns(`route/${this.props.ns}`)}, ({fullRoute, go}) => {
      const {exact, match} = this.props;
      const matcher = createMatcher(match, exact);
      const isActive = !!matcher(fullRoute);

      return h(Link, {
        ...(this.props as ILinkProps),
        isActive,
        onGo: go
      })
    });
  }
}
