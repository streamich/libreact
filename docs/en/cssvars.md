# CSS Variables

Use [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (aka CSS variables) theming with automatic fallback
to [regular theming](./theme.md). Below components allow you to safely use CSS variables. You simply use `<CssVarsProvider>` similar
to how you use [`<Theme>`](./theme.md#theme), but if CSS variables are supported by user's browser, *all values will be replaced
by CSS variables* and on subsequent re-renders it will try to *just modify the CSS variables without re-rendering* the children.

> If CSS Custom Properties are not supported, CssVars works like a typical theme provider.

## Usage

```jsx
import {CssVarsProvider, CssVars} from 'libreact/lib/cssvars';

<CssVarsProvider vars={{
  color: 'tomato'
}}>
  <CssVars>{vars =>
    <button style={vars}>Click me!</button>
  }</CssVars>
</CssVarsProvider>
```

In the above example `vars` is replaced by something like

```js
{
  color: '---libreact-color'
}
```

, where `---libreact-color` is a CSS variable, which will be updated on theme changes, instead
of re-rendering the children.


## `<CssVarsProvider>`

CSS variable context provider.

### Props

  - `ns` &mdash; optional, string, context namespace, defaults to empty string `''`.
  - `vars` &mdash; required, plain flat JavaScript object, map of keys to CSS values, which will be replaces by CSS variables.


## `<CssVars>`

CSS variable context consumer render prop.

### Props

  - `ns` &mdash; optional, string, context namespace, defaults to `''`.

### Arguments

Render prop receives a single argument &mdash; map of variables where values are replaced by CSS variables.


## `withCssVars()` HOC

Enhancer that injects `vars` prop into component.

### Usage

```js
import {withCssVars} from 'libreact/lib/cssvars';

const MyCompWithVars = withCssVars(MyComp);
const MyCompWithVars = withCssVars(MyComp, 'theme', {ns: 'css-theme'});
```

### Signature

```js
withCssVars(Component, propName?, cssVarsProps?);
```


## `@withCssVars` Decorator

Stateful class decorator that injects `vars` prop.

### Usage

```js
import {withCssVars} from 'libreact/lib/cssvars';

@withCssVars
class MyCompWithVars extends Component {

}

@withCssVars('theme', {ns: 'css-theme'})
class MyCompWithVars extends Component {

}
```
