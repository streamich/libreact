# `<Parallax>`

This component allows you to create [*Parallax effects*](https://en.wikipedia.org/wiki/Parallax). It supports [React Universal Interface](https://www.npmjs.com/package/react-universal-interface).


## Usage

The below example will slow down the scrolling of your `<img>` element.

```jsx
import {Parallax} from 'libreact/lib/Parallax';

<Parallax>{({value}) =>
  <img style={{marginTop: value * 300}} src={/* ... */} />
}</Parallax>
```


## Props

- `distance` &mdash; optional, number, maximum distance for parallax effect to take effect, if omitted,
parallax effect will continue thoughout the length of your element, if set, the length of the parallax
effect will be capped at `distance`, defaults to `Infinity`.
- `throttle` &mdash; optional, number in milliseconds, used to throttle document `scroll` event, defaults to `50`.
- `margin` &mdash; optional, a 4-tuple `[top, right, bottom, left]` margins in pixels to apply to the viewport.
- `onChange` &mdash; optional, callback, triggered every time the state of `<Parallax>` component changes. Receives the
state of the `<Parallax>` component as a single argument.


## Data

Provides render prop with the following data object.

```ts
{
  distance: number,
  travelled: number,
  value: number,
  el: [number, number, number, number],
  root: [number, number, number, number],
}
```

Where `el` and `root` are rectangle bounds containing the children of the component and the window viewport, respectively.
