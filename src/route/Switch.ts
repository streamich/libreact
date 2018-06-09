import {Children} from 'react';
import {Consumer} from '../context';
import {h, ns} from '../util';
import Route from './Route';
import createMatcher from './createMatcher';

export interface ISwitchProps {
  ns?: string;
}

const Switch: React.SFC<ISwitchProps> = (props) => {
  return h(Consumer, {name: ns(`route/${props.ns}`)}, ({route}) => {
    const routes = Children.toArray(props.children);

    for (let i = 0; i < routes.length; i++) {
      if (process.env.NODE_ENV !== 'production') {
        if ((typeof routes[i] !== 'object') || ((routes[i] as any).type !== Route)) {
          throw new TypeError('All <Switch> children must be <Route> elements.');
        }
      }

      const {match, exact} = (routes[i] as any).props;
      const matchResult = createMatcher(match, exact)(route);

      if (matchResult) {
        return routes[i];
      }
    }

    return null;
  });
};

export default Switch;
