# `<Ripple>`

Creates Material Design ripple effect on click inside your element.


## Usage

```jsx
import {Ripple} from 'libreact/lib/Ripple';

<Ripple>
  <div style={{
    width: 300,
    height: 200,
  }}>
    foobar
  </div>
</Ripple>
```


## Props

- `color` &mdash; optional, string, ripple color.
- `ms` &mdash; optional, number, animation time in milliseconds.


## `withRipple()`

A higher order component that transforms plain DOM type elements into ones with ripple effects.

```js
import {withRipple} from 'libreact/lib/Ripple';

const DivWithRipple = withRipple('div');
const ButtonWithRipple = withRipple('button', {ms: 1000, color: red});
```

As an optional second arguments accepts props to provide to `<Ripple>` component.
