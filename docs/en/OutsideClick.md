# `<OutsideClick>`

Tracks clicks outside its children.


## Usage

```jsx
import {OutsideClick} from 'libreact/lib/OutsideClick';

<OutsideClick onClick={}>
  <div>Don't click here.</div>
</OutsideClick>
```


## Props

- `onClick` &mdash; event called when user click outside of its children.
- `event` &mdash; optional, string, event name subscribe to, defaults to `mousedown`.
