# `<ViewportSensor>`

Tracks if `children` are in viewport. Can be used as FaCC or a regular component.

Under-the-hood it uses `<ViewportObserverSensor>`, which in turn uses [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) API
to detect if your component is in viewport.

If `IntersectionObserver` API is not available it falls back and lazily downloads `<ViewportScrollSensor>`,
which uses document's scroll event to track if your component is in viewport.

## Usage

```jsx
import {ViewportSensor} from 'libreact/lib/ViewportSensor';

<ViewportSensor threshold={1} onChange={console.log}>{(state) =>
  <pre>{JSON.stringify(state, null, 4)}</pre>
}</ViewportSensor>
```

## Props

Sensor's props have the following signature

```ts
interface IViewportSensorProps {
  threshold?: number;
  onChange?: (state: IViewportObserverSensorState) => void;
}
```

, where

  - `threshold` - optional, number, percentage how much does your component have to intersect with viewport
  to be considered visible. Defaults to `0`.
  - `onChange` - optional, callback called when sensor changes its state, receives the state of the sensor as
  a single argument.

## State

Sensor's state has the following signature

```ts
interface IViewportSensorState {
  visible: boolean;
}
```


## `<ViewportScrollSensor>`

Is the same as `<ViewportSensor>`, but uses only window `scroll` event to check for visibility changes.

The `<ViewportScrollSensor>` has an additional prop `throttle`, which is a number in milliseconds specifying
how much to throttle document's `scroll` event.


## `<ViewportObserverSensor>`

Is the same as `<ViewportSensor>`, but uses only `IntersectionObserver` to detect element's intersection
with viewport.


## `withViewport()` HOC

HOC that merges `viewport` boolean prop into enhanced component's props. Uses `<ViewportSensor>` under-the-hood.

```jsx
import {withViewport} from 'libreact/lib/ViewportSensor';

const MyComp = (props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>;

const MyCompWithViewport = withViewport(MyComp);

<MyCompWithViewport />
```

You can overwrite the inject prop name and `<ViewportSensor>` props

```js
const MyCompWithVisibility = withViewport(MyComp, 'visible', {
  threshold: 1
});
```


## `@withViewport` decorator

React stateful component decorator that adds `viewport` prop.

```js
import {withViewport} from 'libreact/lib/ViewportSensor';

@withViewport
class MyComp extends Component {

}
```

Specify different prop name and `<ViewportSensor>` props

```js
@withViewport('visible', {threshold: 1})
class MyComp extends Component {

}
```
