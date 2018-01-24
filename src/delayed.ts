import {lazy, ILazyParams, ILazyComponent} from './lazy';

const wait = (loader, delay) => new Promise((resolve) =>
  setTimeout(() => resolve(loader()), delay)
);

const RIC = (window as any).requestIdleCallback || ((callback) => setTimeout(callback, 300));

const PRIC = (loader) => new Promise((resolve) => RIC(() => resolve(loader())));

const RAF = requestAnimationFrame;

const PRAF = (value) => new Promise((resolve) => RAF(() => resolve(value)));

export interface IDelayedParams<TProps> extends ILazyParams<TProps> {
  delay?: number;
  draf?: boolean;
  idle?: boolean;
}

export type TDelayed = <TProps>(params: IDelayedParams<TProps>) => ILazyComponent<TProps>;

export const delayed: TDelayed = <TProps>(params: IDelayedParams<TProps>) => {
  let {
    delay,
    draf,
    idle
  } = params;

  if (delay) {
    const loader = params.loader;

    params.loader = () => wait(loader, delay) as Promise<React.ComponentClass<any> | React.StatelessComponent<any>>;
  }

  if (idle) {
    const loader = params.loader;

    params.loader = () => PRIC(loader) as Promise<React.ComponentClass<any> | React.StatelessComponent<any>>;
  }

  if (draf) {
    const loader = params.loader;

    params.loader = () => loader().then(PRAF).then(PRAF) as Promise<React.ComponentClass<any> | React.StatelessComponent<any>>;
  }

  return lazy(params);
};
