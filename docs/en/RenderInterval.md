# `<RenderInterval>`

Same as [`<Render>`](./Render.md), but uses `setTimeout` to re-render its children
at a specified frame rate.


## Usage

```jsx
import {RenderInterval} from 'libreact/lib/RenderInterval';

<RenderInterval ms={1000} fps={25}>{({value}) =>
  <div>Value: {value}</div>
}</RenderInterval>
```


## Props

- `ms` &mdash; optional, number, time in milliseconds how long to re-render its children, defaults to `300`.
- `fps` &mdash; optional, number, target frames per second, defaults to `30`.


## `withRenderInterval` HOC

Enhancer that injects `renderInterval` prop into your component.


## `@withRenderInterval` decorator

Stateful component decorator that injects `renderInterval` prop into your component.
