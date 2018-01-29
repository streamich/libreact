# `<Value>`

Allows you to keep a state of an arbitrary value.

## Usage

```jsx
import {Value} from 'libreact/lib/Value';

<Value>{({value, set}) =>
  <input value={value} onChange={(e) => set(e.target.value)} />;
}</Value>
```

## Props

Signature

```ts
interface IValueProps {
  init?: any;
}
```

, where

  - `init` - optional, default value.


## `withValue()` HOC

HOC that merges `value` prop into enhanced component's props.

```jsx
import {withValue} from 'libreact/lib/Value';

const MyCompWithValue = withValue(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithValue = withValue(MyComp, 'foobar');
```

Or simply merge the whole object into your props

```js
const MyCompWithValue = withValue(MyComp, '');
```


## `@withValue` decorator

React stateful component decorator that adds `value` prop.

```js
import {withValue} from 'libreact/lib/Value';

@withValue
class MyComp extends Component {

}
```

Specify different prop name

```js
@withValue('foobar')
class MyComp extends Component {

}
```

or merge the the whole object into props

```js
@withValue('')
class MyComp extends Component {

}
```
