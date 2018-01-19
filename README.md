# mol-fe-react

React.js utility belt.

## Usage

```shell
npm install mol-fe-react --save
```

## Reference

  - [`mock()`](#mock)
  - [`loadable()`](#loadable)
  - [`lazy()`](#lazy)
  - [`delayed()`](#delayed)


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


### `lazy()`

Creates a loadable component which is loaded when it is rendered for the first time.

```ts
lazy: <TProps>(params: ILazyParams) => ILazyComponent<TProps>;

interface ILazyParams extends ILoadableParams {}

export interface ILazyComponent<TProps> extends React.SFC<TProps> {
    load();
}
```

Use it the same as `loadable()` function.


### `delayed()`

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
