import {Component, createElement as h} from 'react';
import {mock, IMockParams} from './mock';

export type TLoaderPromise = () => Promise<TComponent<any>>;
export type TLoader = TLoaderPromise;

export interface ILoadableParams extends IMockParams {
    loader: TLoader,
}

export interface ILoadableComponent<TProps> extends React.SFC<TProps> {
    load();
}

export type TLoadable = <TProps>(params: ILoadableParams) => ILoadableComponent<TProps>;

export const loadable: TLoadable = <TProps>(params: ILoadableParams) => {
    const {loader} = params;
    const Mock = mock(params);
    const Loadable: ILoadableComponent<TProps> = ((props) => h(Mock, props)) as ILoadableComponent<TProps>;

    Loadable.load = () => {
        loader().then((Implementation) => {
            Mock.implement(Implementation);
        });
    };

    return Loadable;
};
