# `SizeSensor`

FaCC that tracks width and height of its children.

## Example

Use it as FaCC

```jsx
import {SizeSensor} from 'libreact/lib/SizeSensor';

<SizeSensor>{({width, height}) =>
  `WIDTH: ${width}, HEIGHT: ${height}`
}</SizeSensor>
```

Or use `onSize` prop

```jsx
import {SizeSensor} from 'libreact/lib/SizeSensor';

<SizeSensor onSize={({width, height}) => console.log(width, height)}>
  Resize me!
</SizeSensor>
```
