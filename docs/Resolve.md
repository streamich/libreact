# `<Resolve>`

FaCC that resolves a promise.

## Usage

```jsx
import {Resolve} from 'libreact/lib/Resolve';

<Resolve promise={promise}>{({pending, value, error}) =>
  pending ? null : JSON.stringify(value)
}</Resolve>
```
