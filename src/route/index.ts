import {Component} from 'react';
import {LocationSensor} from '../LocationSensor';
import {Provider, Consumer} from '../context';
import {h, ns} from '../util';
import renderProp from '../util/renderProp';
import {Link, ILinkProps} from '../Link';

export interface IRouteProviderProps {
  children?: any;
  ns?: string;
  fullRoute?: string;
  route?: string;
  parent?: TRouteMatchResult;
}

export class Router extends Component<IRouteProviderProps, any> {
  matches: number = 0;

  inc = () => {
    this.matches++;
  };

  renderProvider (route) {
    const {children, fullRoute} = this.props;
    this.matches = 0;

    const element = h(Provider, {
      name: ns(`route/${this.props.ns}`),
      value: {
        fullRoute: this.props.fullRoute || route,
        route,
        inc: this.inc,
        count: () => this.matches,
        parent: this.props.parent
      }
    }, renderProp(this.props));

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

export function createMatcher (match: string | RegExp | TRouteMatcher, exact?: boolean): TRouteMatcher {
  let matcher: TRouteMatcher;

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
    return h(Consumer, {name: ns(`route/${this.props.ns}`)}, ({route, inc, count, parent}) => {
      const {children, exact, match, preserve, min, max} = this.props;
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
            renderProp(this.props, {
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

export const Route404 = (props) => h(Route, {
  max: 0,
  ...props
});

export * from './go';

export interface IGoProps extends ILinkProps {
  ns?: string;
}

export interface IGoState {

}

export class Go extends Component<IGoProps, IGoState> {
  render () {
    return h(Consumer, {name: ns(`route/${this.props.ns}`)}, ({fullRoute, route, inc, count, parent}) => {
      return h(Link, this.props)
    });
  }
}
