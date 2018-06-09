import {h} from '../util';
import Router from './Router';
import Match from './Match';
import Route from './Route';
import Switch from './Switch';
import defaultGo from './go';
import Link from './Link';

const createRouter = (ns: string, go = defaultGo) => {
  const proxy = (Comp) => (props) => h(Comp, {...props, ns});

  return {
    Router: proxy(Router),
    Match: proxy(Match),
    Route: proxy(Route),
    Switch: proxy(Switch),
    go,
    Link: (props) => h(Link, {...props, go}),
  };
};

export default createRouter;
