import {h} from '../util';
import {State} from '../State';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IValueProps {
  init?: any;
  children?: (state) => React.ReactElement<any>;
  render?: (state) => React.ReactElement<any>;
}

export const Value: React.StatelessComponent<IValueProps> = (props) => {
  return h(State, {
    init: {
      value: props.init
    },
    render: ({value}, set) => renderProp(props, {
      value,
      set: (value) => set({value})
    })
  });
};

export const faccToHocInit = (Facc, name) => (Comp, name2?, init?) => {
  const isClassDecoratorMethodCall = typeof Comp === 'string';

    if (isClassDecoratorMethodCall) {
      return faccToHoc(Facc, name)(Comp, {init: name2});
    } else {
      return faccToHoc(Facc, name)(Comp, name2, {init});
    }
};

export const withValue = faccToHocInit(Value, 'value');
