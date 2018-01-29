import { Value, faccToHocInit } from '../Value';
import renderProp from '../util/renderProp';
export const Counter = (props) => {
    return Value({
        init: props.init || 0,
        render: (state) => renderProp(props, Object.assign(state, {
            inc: (by = 1) => state.set(state.value + (+by || 0))
        }))
    });
};
export const withCounter = faccToHocInit(Counter, 'counter');
