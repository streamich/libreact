# `WindowSizeSensor`

FaCC that re-renders on window size change.

## Example

```jsx
import {WindowSizeSensor} from 'mol-fe-react/lib/WindowSizeSensor';

<WindowSizeSensor>{({width, height}) =>
  `width: ${width}, height: ${height}`
}</WindowSizeSensor>
```
