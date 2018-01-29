import {h} from '../util';
import {State} from '../State';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IFlipflopProps {
  init?: boolean;
}

export const Flipflop: React.StatelessComponent<IFlipflopProps> = (props) => {
  const initialState = props.init || false;

  return h(State, {
    init: {on: initialState},
    render: ({on}, set) => renderProp(props, {
      on,
      flip: () => {
        if (on === initialState) {
          set({on: !initialState});
        }
      },
      flop: () => {
        if (on !== initialState) {
          set({on: initialState});
        }
      }
    })
  });
};

export const withFlipflop = faccToHoc(Flipflop, 'flipflop');
