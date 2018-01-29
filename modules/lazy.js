import { createElement as h } from 'react';
import { loadable } from './loadable';
export const lazy = (params) => {
    const Loadable = loadable(params);
    let needsLoading = true;
    const Lazy = ((props) => {
        if (needsLoading) {
            needsLoading = false;
            Loadable.load();
        }
        return h(Loadable, props);
    });
    Lazy.load = Loadable.load;
    return Lazy;
};
