import {h} from '../util';
import {Value} from '../Value';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface ICounterProps {
  init?: number;
}

export const Counter: React.StatelessComponent<ICounterProps> = (props) => {
  return h(Value, {
    init: props.init || 0,
    render: ({value, set}) => renderProp(props, {
      cnt: value,
      set,
      inc: (by: number = 1) => set(value + by)
    })
  });
};

export const withCounter = faccToHoc(Counter, 'counter');
