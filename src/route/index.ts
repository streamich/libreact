import {Component} from 'react';
import {render} from 'react-universal-interface';
import {LocationSensor} from '../LocationSensor';
import {Provider, Consumer} from '../context';
import {h, ns} from '../util';
import {Link, ILinkProps} from '../Link';
import {go, TGo} from './go';

export {
  go
};

export interface IRouteProviderProps {
  children?: any;
  ns?: string;
  fullRoute?: string;
  route?: string;
  parent?: TRouteMatchResult;
  onGo?: TGo;
}

export class Router extends Component<IRouteProviderProps, any> {
  static defaultProps = {
    onGo: go
  };

  matches: number = 0;

  inc = () => {
    this.matches++;
  };

  renderProvider (route) {
    this.matches = 0;

    const element = h(Provider as any, {
      name: ns(`route/${this.props.ns}`),
      value: {
        go: this.props.onGo,
        fullRoute: this.props.fullRoute || route,
        route,
        inc: this.inc,
        count: () => this.matches,
        parent: this.props.parent
      }
    }, render(this.props, null));

    return element;
  }

  render () {
    const {props} = this;
    const {route} = props;

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

export function createMatcher (match: string | RegExp | TRouteMatcher, exact?: boolean): TRouteMatcher {
  if (typeof match === 'function') {
    return match;
  }

  let regex: RegExp;

  if (typeof match === 'string') {
    regex = new RegExp(`^(${match}${exact ? '$' : ''})`);
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

export interface IRouteMatch {
  children?: any;
  render?: React.ReactElement<any> | ((params) => React.ReactElement<any>);
  comp?: React.ComponentClass<any> | React.StatelessComponent<any>;
  component?: React.ComponentClass<any> | React.StatelessComponent<any>;
  exact?: boolean;
  match?: TRouteMatcher | RegExp | string;
  min?: number;
  max?: number;
  ns?: string;
  preserve?: boolean;
}

export class Route extends Component<IRouteMatch, any> {
  static defaultProps = {
    match: /.+/,
    min: 0,
    max: Infinity
  };

  render () {
    return h(Consumer, {name: ns(`route/${this.props.ns}`)}, (context) => {
      const {fullRoute, route, go, inc, count, parent} = context;
      const {exact, match, preserve, min, max} = this.props;
      const matchCount = count();

      if ((matchCount >= min) && (matchCount <= max)) {
        const matchResult = createMatcher(match, exact)(route);

        if (matchResult) {
          // Increment number of matched routes.
          inc();

          (matchResult as any).parent = parent;
          const {matches, length} = matchResult;
          let newRoute = route;

          if (!preserve && length) {
            newRoute = newRoute.substr(length);
          }

          return h(Router, {
            fullRoute: route,
            route: newRoute,
            parent: matchResult
          },
            render(this.props, {
              go,
              match: route.substr(0, length),
              matches,
              route: newRoute,
              fullRoute,
              parent
            })
          );
        }
      }

      return null;
    });
  }
}

export const Route404 = (props) => h(Route, {
  max: 0,
  ...props
});

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
