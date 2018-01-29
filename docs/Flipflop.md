# `<Flipflop>`

Similar to [`<Toggle>`](./Toggle.md) but allows to flip the state only once using the `flip` method. Repeated calls to `flip`
will have no effect. To flop the state back again, use `flop` method.

## Usage

```jsx
import {Flipflop} from 'libreact/lib/Flipflop';

<Flipflop>{({on, flip, flop}) =>
  <div onClick={flip}>{on ? 'ON' : 'OFF'}</div>
}</Flipflop>
```

## Props

Signature

```ts
interface IFlipflopProps {
  init?: boolean;
}
```

, where

  - `init` - optional, boolean, initial state of the flipflop.


## `withFlipflop()` HOC

HOC that merges `flipflop` prop into enhanced component's props.

```jsx
import {withFlipflop} from 'libreact/lib/Flipflop';

const MyCompWithFlipflop = withFlipflop(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithFlipflop = withFlipflop(MyComp, 'foobar');
```

Or simply merge the whole object into your props

```js
const MyCompWithFlipflop = withFlipflop(MyComp, '');
```


## `@withFlipflop` decorator

React stateful component decorator that adds `flipflop` prop.

```js
import {withFlipflop} from 'libreact/lib/Flipflop';

@withFlipflop
class MyComp extends Component {

}
```

Specify different prop name

```js
@withFlipflop('foobar')
class MyComp extends Component {

}
```

or merge the the whole object into props

```js
@withFlipflop('')
class MyComp extends Component {

}
```