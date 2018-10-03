# `<Counter>`

[![React Universal Interface](https://img.shields.io/badge/React-Universal%20Interface-green.svg)](https://github.com/streamich/react-universal-interface)

Allows you to keep a state of a counter value. Is similar to [`<Value>`](./Value.md) but its
value is cast to `number` and you have an extra `inc(by = 1)` method that will increment your counter.

## Usage

```jsx
import {Counter} from 'libreact/lib/Counter';

<Counter>{({value, set, inc}) =>
  <div onClick={() => inc(2))} onDoubleClick={() => set(0)}>
    {value}
  <div>
}</Counter>
```

## Props

Signature

```ts
interface ICounterProps {
  init?: number;
}
```

, where

  - `init` - optional, number, default value.


## `withCounter()` HOC

HOC that merges `counter` prop into enhanced component's props.

```jsx
import {withCounter} from 'libreact/lib/Counter';

const MyCompWithCounter = withCounter(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithCounter = withCounter(MyComp, 'foobar');
```

Or simply merge the whole object into your props

```js
const MyCompWithCounter = withCounter(MyComp, '');
```

Set default value

```js
const MyCompWithCounter = withCounter(MyComp, '', -123);
```



## `@withCounter` decorator

React stateful component decorator that adds `counter` prop.

```js
import {withCounter} from 'libreact/lib/Counter';

@withCounter
class MyComp extends Component {

}
```

Specify different prop name

```js
@withCounter('foobar')
class MyComp extends Component {

}
```

or merge the the whole object into props

```js
@withCounter('')
class MyComp extends Component {

}
```

set starting value

```js
@withCounter('', 123)
class MyComp extends Component {

}
```