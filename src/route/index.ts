import {Component} from 'react';
import {LocationSensor} from '../LocationSensor';
import {Provider, Consumer} from '../context';
import {h, sym} from '../util';

const $$location = sym('location');

export interface IRouteProviderProps {
  children?: any;
  route?: string;
  parent?: TRouteMatchResult;
}

export class Router extends Component<IRouteProviderProps, any> {
  matches: number = 0;

  onMatch = () => {
    this.matches++;
  };

  renderProvider (route) {
    this.matches = 0;

    const element = h(Provider, {
      name: $$location,
      value: {
        route,
        onMatch: this.onMatch,
        getMathces: () => this.matches,
        parent: this.props.parent
      }
    }, this.props.children);

    return element;
  }

  render () {
    const {props} = this;
    const {children, route} = props;

    if(typeof route === 'string') {
      return this.renderProvider(route);
    }

    return h(LocationSensor, {}, (value) => this.renderProvider(value.pathname));
  }
}

export interface TRouteMatchResult {
  length: number; // Length how many characters to truncate from route.
  matches?: RegExpMatchArray; // RegExp matches, if any.
}

export type TRouteMatcher = (route: string) => TRouteMatchResult;

export interface IRouteMatch {
  children?: React.ReactElement<any> | ((params) => React.ReactElement<any>);
  comp?: React.ComponentClass<{}> | React.StatelessComponent<{}>;
  exact?: boolean;
  match?: TRouteMatcher | RegExp | string;
  cnt?: number;
  preserve?: boolean;
}

export class Route extends Component<IRouteMatch, any> {
  static defaultProps = {
    match: /.*/,
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

  render () {
    return h(Consumer, {name: $$location}, ({route, onMatch, getMathces, parent}) => {
      const {children, match} = this.props;

      if (getMathces() <= this.props.cnt) {
        const matchResult = this.matcher()(route);

        if (matchResult) {
          (matchResult as any).parent = parent;
          const {matches, length} = matchResult;

          // Notify <RouteProvider> that we matched.
          onMatch(this, matchResult);

          if (!this.props.preserve && length) {
            route = route.substr(length);
          }

          return h(Router, {route, parent: matchResult},
            this.props.comp ?
              h(this.props.comp) :
              typeof children === 'function' ? children({matches, route, parent}) : children
          );
        }
      }

      return null;
    });
  }
}
