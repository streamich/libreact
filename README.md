# mol-fe-react

React.js utility belt.

## Usage

```shell
npm install mol-fe-react --save
```

## Reference

  - [`mock()`](#mock)
  - [`loadable()`](#loadable)


### `mock()`

Create a mock React component whose implementation can be postponed.

```ts
const mock: <TProps>(params?: ImockParams) => IMockConstructor<TProps>;

interface ImockParams {
  loading?: React.ReactElement<any>;
}

interface IMockComponent<TProps> {
  new (props: TProps, context): IMock<TProps>;
  implement(Implementation: React.Component<TProps, any> | React.SFC<TProps>);
}
```

  - `loading` - React element to show while the is not implemented.
  - `.implement` - use this method to set the implementation of your mock coponent.

#### Example

Create a mock and implement it

```js
const Player = mock();

Player.implement(PlayerMailOnline);
```

Specify placeholder for the mock

```js
const MySvg = mock({
    loading: 'SVG is loading...'
});
```


### `loadable()`

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

#### Example

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

