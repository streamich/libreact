# `lazy()`

Creates a `loadable()` component which is loaded automatically when it is rendered for the first time.

Use it the same as [`loadable()`](./loadable.md).


## Reference

```ts
lazy: (params: ILazyParams) => React.ComponentClass;

interface ILazyParams extends ILoadableParams {}
```
