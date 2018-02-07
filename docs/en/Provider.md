# Context

Provides a generic way to safely use React's context. Re-renders *consumer*
components when *provider* changes value.

## Example

```jsx
import {Provider, Context} from 'libreact/lib/context';

<Provider name="theme" value={{color: 'red'}}>
  <Consumer name="theme">{(theme) => {
      return <div>Color is: {theme.color}</div>;
  }}</Consumer>
</Provider>
```

## `<Provider>`

Uses React's context functionality to provide data to child nodes.

### Props

Signature

```ts
interface IProviderProps {
  name: string;
  value: any;
}
```

, where

  - `name` - context channel name
  - `value` - value to be broadcasted in this channel.

## `<Consumer>`

Retrieves context value from specified channel.

### Props

  - `name` - provider channel to subscribe to.


## `withContext()` HOC

HOC that ensures your component will receive context value it subscribed to.

```ts
withContext: (Comp: React.Component, propName?: string, props?: IProviderProps) => React.Component;
```

, where

  - `Comp` &mdash; your React component.
  - `propName` &mdash; prop that will hold context value.
  - `props` &mdash; props passed to [`<Consumer>`](#consumer).

Returns a *connected* component that will have a prop named `propName` with value
fetched from context.

If `propName` is not specified or set as an empty string, the context value will be
merged into component's props.

### Example

```jsx
import {withContext} from 'libreact/lib/context';

const ColorIs = ({theme}) => <div>Color is: {theme.color}</div>;
const ColorIsConnected = withContext(ColorIs, 'theme', {name: 'theme'});

<Provider name="theme" value={{color: 'tomato'}}>
  <ColorIsConnected />
</Provider>
```

## `@withContext` Decorator

Similar to [`withContenxt()`](withcontext-hoc) but a decorators that injects context value into stateful component's props.

```jsx
import {withContext} from 'libreact/lib/context';

@withContext('theme', {name: 'theme'})
class App extends Component {
  render () {
    return <div style={{color: this.props.theme.color}}>foo</div>;
  }
}
```
