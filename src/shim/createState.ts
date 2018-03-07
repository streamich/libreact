import {h} from '../util';
import {State} from '../State';

export const createState = (init?) => {
  return (props) => h(State, {init}, props.children);
};
