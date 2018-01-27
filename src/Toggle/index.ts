import {h} from '../util';
import {State} from '../State';
import renderProp from '../util/renderProp';

export interface IToggleProps {
  init?: boolean;
}

export const Toggle: React.StatelessComponent<IToggleProps> = (props) =>
  h(State, {
    init: {on: props.init || false},
    render: ({on}, set) => renderProp(props, on, () => set({on: !on}))
  });
