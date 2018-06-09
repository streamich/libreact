import {Component, Children} from 'react';
import createMatcher from './createMatcher';

const Switch = ({children}) => {
  const routes = Children.toArray(children);

  let route = null;

  for (let i = 0; i < routes.length; i++) {
    if (process.env.NODE_ENV !== 'production') {
      // TODO: check that each element is a Route.
    }

    const {match, exact} = (routes[i] as any).props;
    const matchResult = createMatcher(match, exact)(route);

    if (matchResult) {
      route = routes[i];

      break;
    }
  }

  return route;
};

export default Switch;
