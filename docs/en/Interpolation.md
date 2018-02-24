# `<Interpolation>`

`<Interpolation>` is similar to [`<Tween>`](./Tween.md), but instead of simply providing
a value in `[0...1]` range it interpolates a map of values you define.


## Usage

Below code animates movement of a 100x100px square.

```jsx
import {Interpolation} from 'libreact/lib/Interpolation';

<Interpolation ms={1000} easing='inQuint' map={{
  left: [120, 300],
  top: [22, 322],
  opacity: [0, 1]
}}>{({left, top, opacity}) =>
  <div style={{
    width: 100,
    height: 100,
    background: 'tomato',
    opacity,
    position: 'relative',
    top,
    left
  }}/>
}</Interpolation>
```


## Props

Accepts all the [`<Tween>`](./Tween.md) props in addiont to:

- `map` &mdash; required, map of `[start, end]` values to interpolate.


## `withInterpolation()` HOC

Injects an `interpolation` prop into your component.

```js
import {withInterpolation} from 'libreact/lib/Interpolation';

const CompAnimated = withInterpolation(Comp, 'interpolation', {
  ms: 1000,
  easing: 'circ',
  map: {
    left: [120, 300],
    top: [22, 322],
    opacity: [0, 1]
  }
});
```


## `@withInterpolation` decorator

Injects an `interpolation` prop into your component.

```js
import {withInterpolation} from 'libreact/lib/Interpolation';

@withInterpolation('interpolation', {
  ms: 1000,
  easing: 'circ',
  map: {
    left: [120, 300],
    top: [22, 322],
    opacity: [0, 1]
  }
})
class MyComp extends Component {

}
```
