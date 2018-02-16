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

```ts
mock: (params?: IMockParams) => IMockComponent;

interface IMockParams {
  loading?: React.ReactElement | React.ComponentClass | React.StatelessComponent;
}

interface IMockComponent extends React.ComponentClass {
  implement(Implementation: React.ComponentClass | React.StatelessComponent);
}
```

  - `loading` - React element to show while the mock is not implemented.
  - `.implement()` - use this method to set the implementation of your mock component.
