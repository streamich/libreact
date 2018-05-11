# `WindowWidthSensor`

FaCC that re-renders on window width change.

## Example

```jsx
import {WindowWidthSensor} from 'libreact/lib/WindowWidthSensor';

<WindowWidthSensor>{({width}) =>
  `width: ${width}`
}</WindowWidthSensor>
```

You can use it without children.

```jsx
<WindowWidthSensor onWidth={({width}) => console.log(width)} />
```

## `withWindowWidth()` HOC

HOC that merges `windowWidth` prop into enhanced component's props.

```jsx
import {withWindowWidth} from 'libreact/lib/WindowWidthSensor';
```


## `@withWindowWidth` decorator

React stateful component decorator that adds `windowWidth` prop.

```js
import {withWindowWidth} from 'libreact/lib/WindowWidthSensor';

@withWindowWidth
class MyComp extends Component {

}
```
