# `WindowScrollSensor`

FaCC that re-renders on window scroll.

## Example

```jsx
import {WindowScrollSensor} from 'libreact/lib/WindowScrollSensor';

<WindowScrollSensor>{({x, y}) =>
  `x: ${x}, y: ${y}`
}</WindowScrollSensor>
```

You can also use it without children.

```jsx
<WindowScrollSensor onChange={({x, y}) => console.log(x, y)} />
```


## `withWindowScroll()` HOC

HOC that merges `windowScroll` prop into enhanced component's props.

```jsx
import {withWindowScroll} from 'libreact/lib/WindowScrollSensor';
```


## `@withWindowScroll` decorator

React stateful component decorator that adds `windowScroll` prop.

```js
import {withWindowScroll} from 'libreact/lib/WindowScrollSensor';

@withWindowScroll
class MyComp extends Component {

}
```
