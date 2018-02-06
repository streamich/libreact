export type TObservalbeUnsub = (() => void);
export type TObservableSet<T> = (state: T) => void;
export interface IObservable<T> {
  get: () => T;
  set: TObservableSet<T>;
  sub: (listener: TObservableSet<T>) => TObservalbeUnsub;
}

export const observable: <T>(state?: T) => IObservable<T> = state => {
  let listeners = [];
  let currentState = state;

  const get = () => currentState;

  const set = state => {
    currentState = state;
    for (const listener of listeners) listener(currentState);
  };

  const sub = listener => {
    listeners.push(listener);

    return () => (listeners = listeners.filter(item => item !== listener));
  };

  return {
    get,
    set,
    sub,
  };
};
