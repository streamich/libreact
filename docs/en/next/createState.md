# `createState()`

Create a state container.


## Usage

```jsx
import {createState} from 'libreact/lib/shim';

const State = createState({
  cnt: 1,
});

<State>{(state, setState) =>
  <button onClick={() => setState({cnt: state.cnt + 1})}>
    Clicks: {state.cnt}
  </button>
}</State>
```
