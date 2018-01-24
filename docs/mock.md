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

```js
const MySvg = mock({
    loading: 'SVG is loading...'
});
```

## Reference

```ts
mock: (params?: IMockParams) => IMockComponent;

interface IMockParams {
  loading?: React.ReactElement;
}

interface IMockComponent {
  implement(Implementation: React.Component | React.SFC);
}
```

  - `loading` - React element to show while the mock is not implemented.
  - `.implement` - use this method to set the implementation of your mock coponent.
