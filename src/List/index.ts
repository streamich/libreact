import {h} from '../util';
import {Value, faccToHocInit} from '../Value';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IListProps {
  init?: any[];
}

export const List: React.StatelessComponent<IListProps> = (props) => {
  return Value({
    init: Array.isArray(props.init) ? props.init : [],
    render: (state) => {
      const {value, set} = state;

      return renderProp(props, Object.assign(state, {
        push: (entry) => set([...value, entry]),
        filter: (fn) => set(value.filter(fn)),
        sort: (fn?) => set([...value].sort(fn))
      }));
    }
  });
};

export const withList = faccToHocInit(List, 'list');
