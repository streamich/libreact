# Theme

Uses [context](./context.md) components to provide theme object deep down React tree.

## Example

```jsx
import {Theme, Themed} from 'libreact/lib/theme';

const theme = {
  color: 'white',
  background: 'tomato'
};

<Theme value={theme}>
  <Themed>{({color, background}) =>
    <div style={{color, background}}>Color is: {color}</div>
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


## `withTheme()` HOC

Theme enhancer that ensures your component is injected with `theme` property.

```ts
withTheme: (Comp: React.Component, propName?: string, props?: object) => React.Component;
```

, where

  - `Comp` - your React component.
  - `propName` - optional, string, injected prop name.
  - `props` - optional, object, props to provided to [`<Themed>`](#themed).

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


## `@withTheme` decorator

React component class decorator that injects `theme` into props. You can optionally,
specify injected prop name and theme name.

Usage

```js
@withTheme
@withTheme('')
@withTheme('specialTheme', {name: 'specialTheme'})
class Button extends Component {

}
``
