import {createElement as h} from 'react';
import {loadable, ILoadableParams} from './loadable';

export interface ILazyParams<TProps> extends ILoadableParams<TProps> {

}

export type TLazy = <TProps>(params: ILazyParams<TProps>) => React.SFC<TProps>;

export const lazy: TLazy = <TProps>(params) => {
    const Loadable = loadable<TProps>(params);

    let needsLoading = true;
    const Lazy = (props: TProps) => {
        if (needsLoading) {
            needsLoading = false;
            Loadable.load();
        }

        return h(Loadable, props);
    };

    return Lazy;
};
