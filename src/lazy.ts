import {createElement as h} from 'react';
import {loadable, ILoadableParams} from './loadable';

export interface ILazyParams<TProps> extends ILoadableParams<TProps> {

}

export interface ILazyComponent<TProps> extends React.SFC<TProps> {
  load();
}

export type TLazy = <TProps>(params: ILazyParams<TProps>) => ILazyComponent<TProps>;

export const lazy: TLazy = <TProps>(params) => {
  const Loadable = loadable<TProps>(params);

  let needsLoading = true;
  const Lazy: ILazyComponent<TProps> = ((props: TProps) => {
    if (needsLoading) {
      needsLoading = false;
      Loadable.load();
    }

    return h(Loadable, props);
  }) as ILazyComponent<TProps>;

  Lazy.load = Loadable.load;

  return Lazy;
};
