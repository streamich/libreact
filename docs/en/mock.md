# `mock()`

Create a mock React component whose implementation can be postponed.


## Example

Create a mock and implement it

```js
import {mock} from 'libreact/lib/mock';

const Player = mock();

// Now you can already use <Player>.
<Player />

// But implement it only later.
Player.implement(RealPlayer);
```

Specify placeholder for the mock

```jsx
const MySvg = mock({
    loading: <span>SVG is loading...</span>
});
```


## Reference

Receives configuration object, with the following keys:

- `loading` - React element or component to show while the mock is not implemented.
- `.implement()` - use this method to set the implementation of your mock component.
