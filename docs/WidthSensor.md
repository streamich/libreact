# `WidthSensor`

FaCC that works similar to [`SizeSensor`](./SizeSensor.md) but re-renders only on width change.

## Example

Use it as FaCC

```jsx
import {WidthSensor} from 'mol-fe-react';

<WidthSensor>{({width, height}) =>
  `WIDTH: ${width}, HEIGHT: ${height}`
}</WidthSensor>
```

Or use `onWidth` prop

```jsx
import {WidthSensor} from 'mol-fe-react';

<SizeSensor onWidth={({width, height}) => console.log(width, height)}>
  Resize me!
</SizeSensor>
```
