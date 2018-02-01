# `WindowSizeSensor`

FaCC that re-renders on window size change.

## Example

```jsx
import {WindowSizeSensor} from 'libreact/lib/WindowSizeSensor';

<WindowSizeSensor>{({width, height}) =>
  `width: ${width}, height: ${height}`
}</WindowSizeSensor>
```

## `withWindowSize()` HOC

HOC that merges `windowSize` prop into enhanced component's props.

```jsx
import {withWindowSize} from 'libreact/lib/WindowSizeSensor';
```


## `@withWindowSize` decorator

React stateful component decorator that adds `windowSize` prop.

```js
import {withWindowSize} from 'libreact/lib/WindowSizeSensor';

@withWindowSize
class MyComp extends Component {

}
```
