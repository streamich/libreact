# `<Toggle>`

Allows you to toggle the state of a boolean.

## Usage

```jsx
import {Toggle} from 'libreact/lib/Toggle';

<Toggle>{({on, toggle}) =>
  <div onClick={toggle}>{on ? 'ON' : 'OFF'}</div>
}</Toggle>
```

## Props

Signature

```ts
interface IToggleProps {
  init?: boolean;
}
```

, where

  - `init` - optional, boolean, initial state of the toggle.


## `withToggle()` HOC

HOC that merges `toggle` prop into enhanced component's props.

```jsx
import {withToggle} from 'libreact/lib/Toggle';

const MyCompWithToggle = withToggle(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithToggle = withToggle(MyComp, 'foobar');
```

Or simply merge the whole object into your props

```js
const MyCompWithToggle = withToggle(MyComp, '');
```


## `@withToggle` decorator

React stateful component decorator that adds `toggle` prop.

```js
import {withToggle} from 'libreact/lib/Toggle';

@withToggle
class MyComp extends Component {

}
```

Specify different prop name

```js
@withToggle('foobar')
class MyComp extends Component {

}
```

or merge the the whole object into props

```js
@withToggle('')
class MyComp extends Component {

}
```