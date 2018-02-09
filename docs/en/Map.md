# `<Map>`

Gives you a map as a state.

## Usage

```jsx
import {Map} from 'libreact/lib/Map';

<Map init={{c: 'd'}}>{({get, set, remove}) =>
  <div>
    <div>a: {get('a')}</div>
    <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(get())}</pre>
    <button onClick={() => set('a', 'b')}>set('a', 'b')</button>
    <button onClick={() => remove('a')}>remove('a')</button>
  </div>
}</Map>
```

## Props

Signature

```ts
interface IMapProps {
  init?: {[key: string]: any};
}
```

, where

  - `init` - optional, map of initial values.


## `withMap()` HOC

HOC that merges `map` prop into enhanced component's props.

```jsx
import {withMap} from 'libreact/lib/Map';

const MyCompWithMap = withMap(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithMap = withMap(MyComp, 'foobar');
```

Or simply merge the whole object into your props

```js
const MyCompWithMap = withMap(MyComp, '');
```

Set default value

```js
const MyCompWithMap = withMap(MyComp, '', {foo: 'bar'});
```



## `@withMap` decorator

React stateful component decorator that adds `map` prop.

```js
import {withMap} from 'libreact/lib/Map';

@withMap
class MyComp extends Component {

}
```

Specify different prop name

```js
@withMap('foobar')
class MyComp extends Component {

}
```

or merge the the whole object into props

```js
@withMap('')
class MyComp extends Component {

}
```

set starting value

```js
@withMap('', {foo: 'bar'})
class MyComp extends Component {

}
```
