import {h} from '../util';
import {State} from '../State';
import renderProp from '../util/renderProp';

export const Toggle = (props) =>
  h(State, {
    init: {on: props.on || false},
    render: ({on}, set) => renderProp(props, on, () => set({on: !on}))
  });
