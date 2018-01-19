# `loadable()`

Create a mock React component whose implementation is loeaded using a promise when `.load()` methods is called.

```ts
const loadable: <TProps>(params: ILoadableParams) => ILoadableComponent<TProps>;

interface ILoadableParams extends IMockParams {
    loader: () => Promise<TComponent<any>>,
}

interface ILoadableComponent<TProps> extends IMockComponent<TProps> {
    load();
}
```

## Example

Create a loadable React component and immediately load it.

```js
const SVGImage = loadable({
    loader: () => import('./path/to/image.svg').then((module) => module.MySVGComponent)
});

SVGImage.load();
```

Use default exports

```js
const LoadableComp = loadable({
  loader: () => import('./MyComp')
});
```
