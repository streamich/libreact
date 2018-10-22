# `<OutsideClick>`

Tracks clicks outside its `children` or `clickRoots()`.


## Usage

### Default

```jsx
import {OutsideClick} from 'libreact/lib/OutsideClick';

<OutsideClick onClick={}>
  <div>Don't click here.</div>
</OutsideClick>
```

### Using a Portal

```jsx
import {OutsideClick} from 'libreact/lib/OutsideClick';

<OutsideClick onClick={} clickRoots={() => ([
  document.getElementById('my-portal-root')
])}>
  <div>Click anywhere outside `#my-portal-root` and my `onClick` will fire.</div>
</OutsideClick>
```


## Props

- `onClick` &mdash; event called when user click outside of its children.
- `event` &mdash; optional, string, event name subscribe to, defaults to `mousedown`.
- `clickRoots` &mdash; optional, function that should return an array of DOM nodes. These should be considered where the user clicks inside, i.e. clicking outside of these roots will fire `onClick`.
