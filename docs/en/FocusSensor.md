# `<FocusSensor>`

Render prop that tracks elements focus status. Attaches to the root element, or provides a binding, if `bond` prop specified.

## Example

Use it as FaCC, attach to root element

```jsx
import {FocusSensor} from 'libreact/lib/FocusSensor';

<FocusSensor>{({isFocused}) =>
  <div>{isFocused ? 'focused' : 'not focused'}</div>
}</FocusSensor>
```

Use `bond` to bind to any element

```jsx
import {FocusSensor} from 'libreact/lib/FocusSensor';

<FocusSensor bond>{({bond, isFocused}) =>
  <div>
    <div {...bond}>{isFocused ? 'focused' : 'not focused'}</div>
  </div>
}</FocusSensor>
```


## Props

Prop signature

```ts
interface IFocusSensorProps {
  bond?: boolean | string;
}
```

, where

  - `bond` - optional, string, specifies the bond name. If boolean and set to `true`, bond with name `"bond"` is created.


## `withFocus()` HOC

HOC that merges `focus` prop into enhanced component's props. With HOC interface you always have to use bond.

```jsx
import {withFocus} from 'libreact/lib/FocusSensor';

const MyCompWithHover = withFocus(MyComp);
```


## `@withFocus` decorator

React stateful component decorator that adds `focus` prop.

```js
import {withFocus} from 'libreact/lib/FocusSensor';

@withFocus
class MyComp extends Component {

}
```
