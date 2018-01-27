import {h} from '../util';
import {State} from '../State';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IMapProps {
  init?: {[key: string]: any};
}

export const Map: React.StatelessComponent<IMapProps> = (props) => {
  return h(State, {
    init: props.init && (typeof props.init === 'object') ? props.init : [],
    render: (state, set) => renderProp(props, {
      get: (key) => state[key],
      set: (key, value) => set({
        ...state,
        [key]: value
      }),
      remove: (key) => {
        const {[key]: omit, ...rest} = state;
        set(rest);
      }
    })
  });
};

export const withMap = faccToHoc(Map, 'map');
