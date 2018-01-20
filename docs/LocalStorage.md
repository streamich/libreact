# `LocalStorage`

Uses [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API to persist value in local storage.

## Example

```jsx
import {LocalStorage} from 'mol-fe-react/lib/LocalStorage';

<LocalStorage name='foo' value='bar' />
<LocalStorage name='foo2' value='baz' persist />
```

## Props

  - `name` - key name on `localStorage` object.
  - `value` - value to store.
  - `persist` - optional boolean, that indicates whether to leave the value in `localStorage` when
  your component unmounts. By defaults the stored local storage value is removed once the coponent is
  un-mounted, set it to `true` to leave the value on un-mount.
