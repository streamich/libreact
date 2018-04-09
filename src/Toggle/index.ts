import {h} from '../util';
import {State} from '../State';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IToggleProps {
  init?: boolean;
}

export const Toggle: React.StatelessComponent<IToggleProps> = (props) =>
  h(State, {
    init: {on: props.init || false},
    render: ({on}, set) => renderProp(props, {
      on,
      toggle: () => set({on: !on}),
      set: (on) => set({on})
    })
  });

export const withToggle = faccToHoc(Toggle, 'toggle');
