# `ScrollSensor`

FaCC that re-renders on when scroll position in a DOM element changes.

## Props

  - `el` - HTMLElement whose `scrollTop` and `scrollLeft` to track.

## Example

```jsx
import {ScrollSensor} from 'libreact/lib/ScrollSensor';

<ScrollSensor el={element}>{({x, y}) =>
  `x: ${x}, y: ${y}`
}</ScrollSensor>
```
