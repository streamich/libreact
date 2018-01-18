# mol-fe-react

React.js utility belt.

## Usage

```shell
npm install mol-fe-react --save
```

## Reference

  - [`mock`](#mock)


### `mock`

```ts
const mock: <TProps>(params?: ImockParams) => IMockConstructor<TProps>;

interface ImockParams {
  loading?: React.ReactElement<any>;
}

interface IMockConstructor<TProps> {
  new (props: TProps, context): React.Component<TProps>;
  implement(Implementation: React.Component<TProps, any> | React.SFC<TProps>);
{}
```

  - `loading` - React element to show while the is not implemented.
  - `.implement` - use this method to set the implementation of your mock coponent.
