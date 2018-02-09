import {observable} from '../observable';

describe('observable()', () => {
  it('creates and object', () => {
    const obs = observable(123);
    expect(typeof obs).toBe('object');
  });

  it('if no initial value provided state equals undefined', () => {
    const obs = observable();
    expect(obs.get()).toBe(void 0);
  });

  it('sets state to the default specified value, .get() returns it', () => {
    const state = {};
    const obs = observable(state);
    expect(obs.get()).toBe(state);
  });

  it('returns mutated state', () => {
    const obs = observable();
    const state = {};
    obs.set(state);
    expect(obs.get()).toBe(state);
  });

  it('.sub() returns an unsub function', () => {
    const obs = observable();
    const unsub = obs.sub(() => {});
    expect(typeof unsub).toBe('function');
  });

  it('calls listener on on state change', () => {
    const listener = jest.fn();
    const obs = observable();
    obs.sub(listener);
    obs.set(123);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('calls correct number of times', () => {
    const listener = jest.fn();
    const obs = observable();
    obs.sub(listener);
    obs.set(1);
    obs.set(2);
    obs.set(3);
    expect(listener).toHaveBeenCalledTimes(3);
  });

  it('calls listener with the correct data', () => {
    const listener = jest.fn();
    const obs = observable();
    obs.sub(listener);
    obs.set(1);
    obs.set(2);
    obs.set(3);
    expect(listener.mock.calls).toEqual([[1], [2], [3]]);
  });

  it('stops calling listener when unsubscribed', () => {
    const listener = jest.fn();
    const obs = observable();
    const unsub = obs.sub(listener);
    obs.set(1);
    obs.set(2);
    unsub();
    obs.set(3);
    expect(listener.mock.calls).toEqual([[1], [2]]);
  });
});
