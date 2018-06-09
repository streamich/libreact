import render from '../util/renderProp';
import Match, {IMatchProps} from './Match';
import {h} from '../util';

const Route: React.SFC<IMatchProps> = props =>
  h(Match, props, data =>
    data.matches
      ? render(props, data)
      : null
  );

export default Route;
