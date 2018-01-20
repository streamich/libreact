# `loadable()`

Create a mock React component whose implementation is loeaded using a promise when `.load()` methods is called.

## Example

Create a loadable React component and immediately load it.

```js
const loader = () => import('./path/to/image.svg').then((module) => module.MySVGComponent);
const SVGImage = loadable({
    loader
});

SVGImage.load();
```

Use default exports

```js
const LoadableComp = loadable({
  loader: () => import('./MyComp')
});
```

## Reference

```ts
const loadable: <TProps>(params: ILoadableParams) => ILoadableComponent<TProps>;

interface ILoadableParams extends IMockParams {
    loader: () => Promise<TComponent<any>>,
}

interface ILoadableComponent<TProps> extends IMockComponent<TProps> {
    load();
}
```
