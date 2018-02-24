# `<Render>`

Re-renders its children on every `requestAnimationFrame` for a specified
interval of time. Keeps track of a normalized duration value `[0...1]`, which
is passed to children and can be used for animation.


## Usage

Below example re-renders its children on every `requestAnimationFrame` for 1 second.

```jsx
import {Render} from 'libreact/lib/Render';

<Render ms={1000}>{({value}) =>
  <div>Value: {value}</div>
}</Render>
```


## Props

- `ms` &mdash; optional, number, time in milliseconds how long to re-render its children, defaults to `300`.


## `withRender` HOC

Enhancer that injects `render` prop into your component.


## `@withRender` decorator

Stateful component decorator that injects `render` prop into your component.
