# `lazy()`

Creates a loadable component which is loaded when it is rendered for the first time.

```ts
lazy: <TProps>(params: ILazyParams) => ILazyComponent<TProps>;

interface ILazyParams extends ILoadableParams {}

export interface ILazyComponent<TProps> extends React.SFC<TProps> {
    load();
}
```

Use it the same as `loadable()` function.
