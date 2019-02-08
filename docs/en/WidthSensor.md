# `<WidthSensor>`

FaCC that works similar to [`<SizeSensor>`](./SizeSensor.md) but re-renders only on width change.

## Example

Use it as FaCC

```jsx
import {WidthSensor} from 'libreact/lib/WidthSensor';

<WidthSensor>{({width, height}) =>
  `WIDTH: ${width}, HEIGHT: ${height}`
}</WidthSensor>
```

Or use `onWidth` prop

```jsx
import {WidthSensor} from 'libreact/lib/WidthSensor';

<WidthSensor onWidth={({width, height}) => console.log(width, height)}>
  Resize me!
</WidthSensor>
```


## `withWidth()` HOC and `@withWidth` decorator

Works same as [`withSize()`](./SizeSensor.md#withsize-hoc) and [`@withSize`](./SizeSensor.md#withsize-decorator).

Incldue `withWidth` as follows

```js
import {withWidth} from 'libreact/lib/WidthSensor';
```
