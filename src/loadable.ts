import {Component, createElement as h} from 'react';
import {mock, IMockParams, IMockComponent} from './mock';

export type TLoaderPromise = () => Promise<TComponent<any>>;
export type TLoader = TLoaderPromise;

export interface ILoadableParams extends IMockParams {
    loader: TLoader,
}

export interface ILoadableComponent<TProps> extends IMockComponent<TProps> {
    load();
}

export type TLoadable = <TProps>(params: ILoadableParams) => ILoadableComponent<TProps>;

export const loadable: TLoadable = <TProps>(params: ILoadableParams) => {
    const {loader} = params;
    const Mock: ILoadableComponent<TProps> = mock(params) as ILoadableComponent<TProps>;

    Mock.load = () => {
        loader().then((Implementation) => {
            Mock.implement(Implementation);
        });
    };

    return Mock;
};
