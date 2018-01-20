# Theme

Uses [context](./context.md) components to provide theme object deep down React tree.

## Example

```jsx
import {Theme, Themed} from 'mol-fe-react/lib/theme';

const theme = {
  color: 'white',
  background: 'tomato'
};

<Theme value={theme}>
  <Themed>{({color, background}) =>
    <div style={{color, background}}>Color is: {color}</div>;
  }</Themed>
</Theme>
```

## `<Theme>`

Theme provider, used to specify and update theme object.

### Props

  - `value` - theme object.
  - `name` - optional, theme name.

## `<Themed>`

FaCC theme consumer, re-renders on theme update.

### Props

  - `name` - optional, theme name.


## `withTheme()`

HOC theme consumer that ensures your component is enhanced with `theme` property.

```ts
withTheme: (Comp: React.Component, name?: string) => React.Component;
```

, where

  - `Comp` - your React component.
  - `name` - optional, theme name.

Returns a *themed* component that will have a prop named `theme` containing
theme object.

### Example

```jsx
const Block = ({theme: {color, background}}) =>
  <div style={{color, background}}>Color is: {color}</div>;
const BlockThemed = withTheme(Block);

const theme = {
  color: 'white',
  background: 'tomato'
};

<Theme value={theme}>
  <BlockThemed />
</Theme>
```
