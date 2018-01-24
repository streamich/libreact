# `WindowScrollSensor`

FaCC that re-renders on window scroll.

## Example

```jsx
import {WindowScrollSensor} from 'libreact/lib/WindowScrollSensor';

<WindowScrollSensor>{({x, y}) =>
  `x: ${x}, y: ${y}`
}</WindowScrollSensor>
```
