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
  - `onChange` - optional, callback called when sensor changes it's state, receives the state of the sensor as
  a single argument.

## State

Sensor's state has the following signature

```ts
interface IViewportSensorState {
  visible: boolean;
}
```

## `<ViewportScrollSensor>`

The `<ViewportScrollSensor>` has an additional prop `throttle`, which is a number in milliseconds specifying
how much to throttle document's `scroll` event.
