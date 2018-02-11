# `<HoverSensor>`

Render prop that tracks elements hover status. Attaches to the root element, or provides a binding, if `bond` prop specified.

## Example

Use it as FaCC, attach to root element

```jsx
import {HoverSensor} from 'libreact/lib/HoverSensor';

<HoverSensor>{({isHover}) =>
  <div>{isHover ? 'hovered' : 'not hovered'}</div>
}</HoverSensor>
```

Use `bond` to bind to any element

```jsx
import {HoverSensor} from 'libreact/lib/HoverSensor';

<HoverSensor bond>{({bond, isHover}) =>
  <div>
    <div {...bond}>{isHover ? 'hovered' : 'not hovered'}</div>
  </div>
}</HoverSensor>
```


## Props

Prop signature

```ts
interface IHoverSensorProps {
  bond?: boolean | string;
}
```

, where

  - `bond` - optional, string, specifies the bond name. If boolean and set to `true`, bond with name `"bond"` is created.


## `withHover()` HOC

HOC that merges `hover` prop into enhanced component's props. With HOC interface you always have to use bond.

```jsx
import {withHover} from 'libreact/lib/HoverSensor';

const MyCompWithHover = withHover(MyComp);
```


## `@withHover` decorator

React stateful component decorator that adds `hover` prop.

```js
import {withHover} from 'libreact/lib/HoverSensor';

@withHover
class MyComp extends Component {

}
```
