import render from '../util/renderProp';
import Router from './Router';
import {Consumer} from '../context';
import {h, ns} from '../util';
import createMatcher, {TRouteMatcher, TRouteMatchResult} from './createMatcher';
import {IUniversalInterfaceProps} from '../typing';

export interface IRouteData {
  fullRoute: string;
  route: string;
  parent: IRouteData;
  match: TRouteMatchResult;
}

export interface IRouteProps extends IUniversalInterfaceProps<IRouteData> {
  ns?: string;
  exact?: boolean;
  match?: TRouteMatcher | RegExp | string;
  truncate?: boolean;
}

const Route: React.SFC<IRouteProps> = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof props.match !== 'string') {
      if (props.exact) {
        console.warn(
          'You are using <Route exact /> with non-string match prop, ' +
          'exact prop works only with string match prop.'
        );
      }
    }
  }

  return h(Consumer, {name: ns(`route/${props.ns}`)}, (context) => {
    const {exact, match, truncate} = props;
    const {fullRoute, route, parent} = context;
    const matches = createMatcher(match, exact)(route);

    if (!matches) {
      return null;
    }

    const data = {
      fullRoute,
      route,
      parent,
      matches,
    };

    let element = render(props, data);

    if (truncate) {
      const routerProps = {
        fullRoute: route,
        route: route.substr(matches[0].length),
        parent: data,
      } as any;

      element = h(Router, routerProps, element);
    }

    return element;
  });
};

Route.defaultProps = {
  match: '',
  exact: false
};

export default Route;
