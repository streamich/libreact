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
    render: ({value}, set) => {
      return renderProp(props, {
        value,
        set: (value) => set({value})
      });
    }
  });
};

export const withValue = faccToHoc(Value, 'value');
