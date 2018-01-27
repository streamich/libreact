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
    render: (state) => renderProp(props, Object.assign(state, {
      inc: (by: number = 1) => state.set(state.value + by)
    }))
  });
};

export const withCounter = (Comp, name?, init?) => {
  const isClassDecoratorMethodCall = typeof Comp === 'string';

  if (isClassDecoratorMethodCall) {
    return faccToHoc(Counter, 'counter')(Comp, {init: name});
  } else {
    return faccToHoc(Counter, 'counter')(Comp, name, {init});
  }
};
