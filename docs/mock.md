# `mock()`

Create a mock React component whose implementation can be postponed.


## Example

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

## Reference

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
