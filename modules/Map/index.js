import renderProp from '../util/renderProp';
import { Value, faccToHocInit } from '../Value';
export const Map = (props) => {
    return Value({
        init: props.init && (typeof props.init === 'object') ? props.init : {},
        render: ({ value, set }) => renderProp(props, {
            get: (key) => key ? value[key] : value,
            set: (key, entry) => set({
                ...value,
                [key]: entry
            }),
            remove: (key) => {
                const { [key]: omit, ...rest } = value;
                set(rest);
            }
        })
    });
};
export const withMap = faccToHocInit(Map, 'map');
