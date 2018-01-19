# `delayed()`

Same as `lazy` but postpones component loading for even longer. Delay, JavaScript idle time and [DRAF](https://github.com/ryanve/draf) can be specified.

```ts
type TDelayed = <TProps>(params: IDelayedParams<TProps>) => ILazyComponent<TProps>;

interface IDelayedParams<TProps> extends ILazyParams<TProps> {
  delay?: number;
  draf?: boolean;
  idle?: boolean;
}
```

  - `delay` - time in milliseconds to wait before loading a component, defaults to `0`.
  - `draf` - either to wait for DRAF before rendering component after it has been loaded, useful to prevent [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) in some cases, if CSS is bundles with your component, defaults to `false`.
  - `idle` - whether to start loading component on JavaScript idle time using `requestIdleCallback`, defaults to `false`.

Using default params this function is equivalent to `lazy()` function.
