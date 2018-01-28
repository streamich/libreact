# Sensors

Sensors are render pros that track some behavior and re-render on state change.

For example, the below `<div>` will be re-rendered every time mouse position changes.

```jsx
<MouseSensor>{({posX, posY}) =>
  <div />
}</MouseSensor>
```

`libreact` comes with plenty of sensors built-in.

  - [`<BatterySensor>`](./BatterySensor.md) &mdash; tracks battery status.
  - [`<GeoLocationSensor>`](./GeoLocationSensor.md) &mdash; tracks device geographical location.
  - [`<HoverSensor>`](./HoverSensor.md) &mdash; tracks element's hover status.
  - [`<MediaDeviceSensor>`](./MediaDeviceSensor.md) &mdash; tracks media devices connected to your device.
  - [`<MediaSensor>`](./MediaSensor.md) &mdash; tracks matches of a media query.
  - [`<MotionSensor>`](./MotionSensor.md) &mdash; tracks physical motion of your device.
  - [`<MouseSensor>`](./MouseSensor.md) &mdash; tracks mouse position inside an element.
  - [`<NetworkSensor>`](./NetworkSensor.md) &mdash; tracks network connectivity and type state.
  - [`<LightSensor>`](./LightSensor.md) &mdash; tracks physical lightning sensor state.
  - [`<LocationSensor>`](./LocationSensor.md) &mdash; tracks browser location.
  - [`<OrientationSensor>`](./OrientationSensor.md) &mdash; tracks physical device orientation.
  - [`<ScrollSensor>`](./ScrollSensor.md) &mdash; tracks scroll offsets in a DOM element.
  - [`<SizeSensor>`](./SizeSensor.md) &mdash; tracks child DOM element size.
    - [`<WidthSensor>`](./WidthSensor.md) &mdash; same as `<SizeSensor>`, but only re-renders on width change.
  - [`<ViewportSensor>`](./ViewportSensor.md) &mdash; tracks elements visibility in viewport.
    - [`<ViewportScrollSensor>`](./ViewportSensor.md#viewportscrollsensor) and [`<ViewportObserverSensor>`](./ViewportSensor.md#viewportobserversensor)
  - [`<WindowScrollSensor>`](./WindowScrollSensor.md) &mdash; tracks window scroll position.
  - [`<WindowSizeSensor>`](./WindowSizeSensor.md) &mdash; tracks window size.

Most sensors have also corresponding HOC and class decorator that provide the same functionality.
For example, [`<NetworkSensor>`](./NetworkSensor.md) render prop component has a corresponding [`withNetowrk()`](./NetworkSensor.md#withnetwork-hoc) HOC and
[`@withNetwork`](./NetworkSensor.md#withnetwork-decorator) decorator.
