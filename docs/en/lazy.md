# `lazy()`

Creates a [`loadable()`](./loadable.md) component which is loaded automatically when it is rendered for the first time.

Use it exactly the same as `loadable()`, the only difference is that it will automatically `.load()` on first render.

However, you still have access to the `.load()` method, which allows you *"pre-load"* your components ahead of time.


## Reference

```ts
lazy: (params: ILazyParams) => React.ComponentClass;

interface ILazyParams extends ILoadableParams {}
```
