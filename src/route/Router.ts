import {Provider} from '../context';
import {h, ns} from '../util';
import {TRouteMatchResult} from './createMatcher';

export interface IRouteProviderProps {
  route: string;
  children: any;
  ns?: string;
  fullRoute?: string;
  parent?: TRouteMatchResult;
}

const Router: React.SFC<IRouteProviderProps> = (props) => {
  const {ns: namespace, route, fullRoute, parent, children} = props;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof route !== 'string') {
      throw new TypeError('Router route must be a string.');
    }
  }

  return h(Provider as any, {
    name: ns(`route/${namespace}`),
    value: {
      fullRoute: fullRoute || route,
      route,
      parent,
    }
  }, children);
}

export default Router;
