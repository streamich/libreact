# `<Toggle>`

Allows you to toggle the state of a boolean.

## Usage

```jsx
import {Toggle} from 'libreact/lib/Toggle';

<Toggle>{({on, toggle}) =>
  <div onClick={toggle}>{on ? 'ON' : 'OFF'}</div>
}</Toggle>
```
