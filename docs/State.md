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
