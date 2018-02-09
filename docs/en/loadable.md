# `loadable()`

Creates a [mock()](./mock.md) component whose implementation is loaded using `.load()` method is called,
instead of explicitly setting it by `.implement()`.

## Example

Create a loadable React component and immediately load it.

```js
import {loadable} from 'libreact/lib/loadable';

const loader = () => import('./path/to/image.svg')
  .then((module) => module.MySVGComponent);

const SVGImage = loadable({
  loader
});

SVGImage.load();
```

Supports default exports, for example, if your `<MyComp>` is actually in `./MyComp/index.js` file
and is exported as `export default MyComp`:

```js
const LoadableComp = loadable({
  loader: () => import('./MyComp')
});
```


## Reference

```ts
loadable: (params: ILoadableParams) => ILoadableComponent;

interface ILoadableParams extends IMockParams {
  loader: () => Promise<React.ComponentClass>,
}

interface ILoadableComponent extends React.ComponentClass {
  load();
}
```
