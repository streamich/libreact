import {Component} from 'react';
import {Consumer} from '../context';
import {h, ns, isClient} from '../util';
import {Link, ILinkProps} from '../Link';
import createMatcher, {TRouteMatcher} from './createMatcher';

export interface IGoParams {
  replace?: boolean;
  title?: string;
  state?: any;
}

export const go = (page: string, {replace, title, state}: IGoParams = {}) => {
  if (isClient) {
    history[replace ? 'replaceState' : 'pushState'](state, title || '', page);
  }
};

export type TGo = (url: string, params: IGoParams) => void;

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
