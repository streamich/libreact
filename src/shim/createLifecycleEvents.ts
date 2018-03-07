import {extend} from 'fast-af/extend';
import {Lifecycles} from '../Lifecycles';
import {h} from '../util';

export const createLifecycleEvents = (lifecycles) => {
  return (props) => h(Lifecycles, extend({}, lifecycles, props));
};
