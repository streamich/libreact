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
