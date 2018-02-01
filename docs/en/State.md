# `<State>`

Injects state into a stateless component.


## Usage

```jsx
import {State} from 'libreact/lib/State';

<State init={}>{(state, set) =>

}</State>
```

Render prop receives two arguments: (1) state of the component; and (2) the `setState` function.


## Props

  - `init` - optional, object, initial state.


## Example

Create a counter

```jsx
<State init={{cnt: 0}}>{({cnt}, set) =>
  <div onClick={() => set({cnt: cnt + 1})}>
    {cnt}
  </div>
}</State>
```


## `withState()` HOC

HOC that merges `state` prop into enhanced component's props. Your component will receive
the state object with merged in `set()` method that you can use to update your state.

```jsx
import {withState} from 'libreact/lib/State';

const MyCompWithState = withState(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithState = withState(MyComp, 'foobar');
```

Or simply merge the whole object into your props

```js
const MyCompWithState = withState(MyComp, '');
```

Specify default state

```js
const MyCompWithState = withState(MyComp, '', {counter: 0});
```
