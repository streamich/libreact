# `<LocationSensor>`

FaCC that uses [`Window.location`](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)  and
[`Window.history`](https://developer.mozilla.org/en-US/docs/Web/API/Window/history) APIs to track
page location and re-render on any changes.

## Usage

```jsx
import {LocationSensor} from 'libreact/lib/LocationSensor';

<LocationSensor>{(location) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(location, null, 4)}
  </pre>
}</LocationSensor>
```

## Props

None.

## Reference

Returns location state object with the following signature

```ts
interface ILocationSensorState {
  trigger: string;
  state?: any;
  length?: number;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
}
```
