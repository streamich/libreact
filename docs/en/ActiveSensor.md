# `<ActiveSensor>`

[![React Universal Interface](https://img.shields.io/badge/React-Universal%20Interface-green.svg)](https://github.com/streamich/react-universal-interface)

Render prop that tracks some element's active status.
Attaches to the root element, or provides a binding, if `bond` prop specified.

## Example

Use it as FaCC, attach to root element

```jsx
import {ActiveSensor} from 'libreact/lib/ActiveSensor';

<ActiveSensor>{({isActive}) =>
  <div>{isActive ? 'active' : 'not active'}</div>
}</ActiveSensor>
```

Use `bond` to bind to any element

```jsx
import {ActiveSensor} from 'libreact/lib/ActiveSensor';

<ActiveSensor bond>{({bond, isActive}) =>
  <div>
    <div {...bond}>{isActive ? 'active' : 'not active'}</div>
  </div>
}</ActiveSensor>
```


## Props

Prop signature

```ts
interface IActiveSensorProps {
  bond?: boolean | string;
}
```

, where

  - `bond` - optional, string, specifies the bond name. If boolean and set to `true`, bond with name `"bond"` is created.


## `withActive()` HOC

HOC that merges `active` prop into enhanced component's props. With HOC interface you always have to use bond.

```jsx
import {withActive} from 'libreact/lib/ActiveSensor';

const MyCompWithHover = withActive(MyComp);
```


## `@withActive` decorator

React stateful component decorator that adds `active` prop.

```js
import {withActive} from 'libreact/lib/ActiveSensor';

@withActive
class MyComp extends Component {

}
```
