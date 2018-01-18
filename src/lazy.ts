import {createElement as h} from 'react';
import {loadable} from './loadable';

export type TLazy = () => any;

export const lazy = (params) => {
    const Loadable = loadable(params);

    let needsLoading = true;
    const Lazy = (props) => {
        if (!needsLoading) {
            Loadable.load();
            needsLoading = false;
        }

        return h(Loadable, props);
    };

    return Lazy;
};
