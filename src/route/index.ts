import {Component} from 'react';
import {LocationSensor} from '../LocationSensor';
import {Provider, Consumer} from '../context';
import {h, ns} from '../util';

export interface IRouteProviderProps {
  children?: any;
  ns?: string;
  route?: string;
  parent?: TRouteMatchResult;
}

export class Router extends Component<IRouteProviderProps, any> {
  matches: number = 0;

  onMatch = () => {
    this.matches++;
  };

  renderProvider (route) {
    const {children} = this.props;
    this.matches = 0;

    const element = h(Provider, {
      name: ns(`route/${this.props.ns}`),
      value: {
        route,
        onMatch: this.onMatch,
        getMatches: () => this.matches,
        parent: this.props.parent
      }
    }, Array.isArray(children) ? h('div', null, children) : children);

    return element;
  }

  render () {
    const {props} = this;
    const {children, route} = props;

    if(typeof route === 'string') {
      return this.renderProvider(route);
    }

    return h(LocationSensor, null, ({pathname}) => this.renderProvider(pathname));
  }
}

export interface TRouteMatchResult {
  length: number; // Length how many characters to truncate from route.
  matches?: RegExpMatchArray; // RegExp matches, if any.
}

export type TRouteMatcher = (route: string) => TRouteMatchResult;

export interface IRouteMatch {
  children?: React.ReactElement<any> | ((params) => React.ReactElement<any>);
  cnt?: number;
  comp?: React.ComponentClass<any> | React.StatelessComponent<any>;
  exact?: boolean;
  match?: TRouteMatcher | RegExp | string;
  ns?: string;
  preserve?: boolean;
}

export class Route extends Component<IRouteMatch, any> {
  static defaultProps = {
    match: /.+/,
    cnt: 0
  };

  matcher (): TRouteMatcher {
    const {match} = this.props;
    let matcher: TRouteMatcher;

    if (typeof match === 'function') {
      return match;
    }

    let regex: RegExp;

    if (typeof match === 'string') {
      regex = new RegExp(`^(${match}${this.props.exact ? '$' : ''})`);
    } else {
      regex = match;
    }

    return (route: string) => {
      const matches = route.match(regex);

      if (!matches) {
        return null;
      }

      return {
        length: (matches && matches[1]) ? matches[1].length : 0,
        matches
      };
    };
  }

  renderChildren (props) {
    const {comp, children} = this.props;

    return comp ?
      h(comp, props) :
      typeof children === 'function' ?
        children(props) :
        children;
  }

  render () {
    return h(Consumer, {name: ns(`route/${this.props.ns}`)}, ({route, onMatch, getMatches, parent}) => {
      const {children, match, preserve} = this.props;

      if (getMatches() <= this.props.cnt) {
        const matchResult = this.matcher()(route);

        if (matchResult) {
          (matchResult as any).parent = parent;
          const {matches, length} = matchResult;

          // Notify <RouteProvider> that we matched.
          onMatch(this, matchResult);

          let newRoute = route;

          if (!preserve && length) {
            newRoute = newRoute.substr(length);
          }

          return h(Router, {route: newRoute, parent: matchResult},
            this.renderChildren({
              match: route.substr(0, length),
              matches,
              route: newRoute,
              parent
            })
          );
        }
      }

      return null;
    });
  }
}

export * from './go';
