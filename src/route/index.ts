import {Component} from 'react';
import {render} from 'react-universal-interface';
import Router from './Router';
import {Consumer} from '../context';
import {h, ns} from '../util';
import {go, Go} from './go';
import createMatcher, {TRouteMatcher} from './createMatcher';

export {
  Router,
  go,
  Go,
};

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
          } as any,
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
