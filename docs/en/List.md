# `<List>`

Gives you an array as a state.

## Usage

```jsx
import {List} from 'libreact/lib/List';

<List init={[1, 2, 3]}>{({value, set, push, filter, sort}) =>
  <div>
    <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(value)}</pre>
    <button onClick={() => push(0)}>push</button>
    <button onClick={() => filter((i) => i > 0)}>filter</button>
    <button onClick={() => sort()}>sort</button>
  </div>
}</List>
```

## Props

Signature

```ts
interface IListProps {
  init?: any[];
}
```

, where

  - `init` - optional, array of any values.


## `withList()` HOC

HOC that merges `list` prop into enhanced component's props.

```jsx
import {withList} from 'libreact/lib/List';

const MyCompWithList = withList(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithList = withList(MyComp, 'foobar');
```

Or simply merge the whole object into your props

```js
const MyCompWithList = withList(MyComp, '');
```

Set default value

```js
const MyCompWithList = withList(MyComp, '', [1, 2, 3]);
```



## `@withList` decorator

React stateful component decorator that adds `list` prop.

```js
import {withList} from 'libreact/lib/List';

@withList
class MyComp extends Component {

}
```

Specify different prop name

```js
@withList('foobar')
class MyComp extends Component {

}
```

or merge the the whole object into props

```js
@withList('')
class MyComp extends Component {

}
```

set starting value

```js
@withList('', [1, 2, 3])
class MyComp extends Component {

}
```
