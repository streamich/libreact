import { h } from '../util';
import { State } from '../State';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';
export const Toggle = (props) => h(State, {
    init: { on: props.init || false },
    render: ({ on }, set) => renderProp(props, {
        on,
        toggle: () => set({ on: !on })
    })
});
export const withToggle = faccToHoc(Toggle, 'toggle');
