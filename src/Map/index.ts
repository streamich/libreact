import renderProp from '../util/renderProp';
import {Value, faccToHocInit} from '../Value';

export interface IMapProps {
  init?: {[key: string]: any};
}

export const Map: React.StatelessComponent<IMapProps> = (props) => {
  return Value({
    init: props.init && (typeof props.init === 'object') ? props.init : {},
    render: ({value, set}) => renderProp(props, {
      get: (key?) => key ? value[key] : value,
      set: (key, entry) => set({
        ...value,
        [key]: entry
      }),
      remove: (key) => {
        const {[key]: omit, ...rest} = value;
        set(rest);
      }
    })
  });
};

export const withMap = faccToHocInit(Map, 'map');
