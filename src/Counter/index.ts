import {Value, faccToHocInit} from '../Value';
import renderProp from '../util/renderProp';

export interface ICounterProps {
  init?: number;
}

export const Counter: React.StatelessComponent<ICounterProps> = (props) => {
  return Value({
    init: props.init || 0,
    render: (state) => renderProp(props, Object.assign(state, {
      inc: (by: number = 1) => state.set(state.value + (+by || 0))
    }))
  });
};

export const withCounter = faccToHocInit(Counter, 'counter');
