# Context

Provides a generic way to safely use React's context. Re-renders *consumer*
components when *provider* changes value.

## Example

```jsx
import {Provider, Context} from 'mol-fe-react/lib/context';

<Provider name="theme" value={{color: 'red'}}>
  <Consumer name="theme">{(theme) => {
      return <div>Color is: {theme.color}</div>;
  }}</Consumer>
</Provider>
```

## `<Provider>`

Uses React's context functionality to provide data to child nodes.

### Props

  - `name` - context channel name
  - `value` - value to be broadcasted in this channel.

## `<Consumer>`

Retrieves context value from specified channel.

### Props

  - `name` - provider channel to subscribe to.


## `withContext()`

HOC that ensures your component will receive context value it subscribed to.

```ts
withContext: (Comp: React.Component, name?: string) => React.Component;
```

, where

  - `Comp` - your React component.
  - `name` - context channel to subscribe to.

Returns a *connected* component that will have a prop named `name` with value
fetched from context. This component has a special prop `contextName` that
your can use to overwrite the default context channel name.

### Example

```jsx
const ColorIs = ({theme}) => <div>Color is: {theme.color}</div>;
const ColorIsConnected = withContext(ColorIs, 'theme');

<Provider name="theme" value={{color: 'tomato'}}>
  <ColorIsConnected />
</Provider>
```