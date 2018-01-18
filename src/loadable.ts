import {Component, createElement as h} from 'react';
import {mock, IMockParams} from './mock';

export type TLoaderPromise = () => Promise<TComponent<any>>;
export type TLoader = TLoaderPromise;

export interface ILoadableParams extends IMockParams {
    loader: TLoader,
}

export interface ILoadableComponent<TProps> {
    new (props: TProps, context): React.Component<TProps, any>;
    load();
}

export type TLoadable = <TProps>(params: ILoadableParams) => ILoadableComponent<TProps>;

export const loadable: TLoadable = <TProps>({loader}: ILoadableParams) => {
    const Mock = mock();
    const Loadable: ILoadableComponent<TProps> = class Loadable extends Component<TProps, any> {
        render () {
            return h(Mock, this.props);
        }
    } as ILoadableComponent<TProps>;

    Loadable.load = () => {
        loader().then((Implementation) => {
            Mock.implement(Implementation);
        });
    };

    return Loadable;
};
