# `<Resolve>`

FaCC that resolves a promise.

## Usage

```jsx
import {Resolve} from 'mol-fe-react/lib/Resolve';

<Resolve promise={promise}>{({pending, value, error}) =>
  pending ? null : JSON.stringify(value)
}</Resolve>
```
