import * as React from 'react';

export type TComponent<TProps> = React.ComponentClass<TProps> | React.StatelessComponent<TProps>;
export type THoc<P1, P2> = (Comp: TComponent<P1>) => TComponent<P2>

export const noop: (...args) => any = () => {};

export const idx = (obj, accessor) => {
  try {
    return accessor(obj);
  } catch (error) {
    return undefined;
  }
};

export const isClient = typeof window === 'object';

export const on = (obj, ...args) => obj.addEventListener(...args);

export const off = (obj, ...args) => obj.removeEventListener(...args);

export const ns = (name) => `@@libreact/${name}`;

const hasSymbols = typeof Symbol !== 'undefined';

export const sym = (name) => {
  return hasSymbols ? Symbol(name) : ns(name);
};

export const isFn = (fn) => typeof fn === 'function';

export const h = React.createElement;
