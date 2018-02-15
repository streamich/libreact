# `<Portal>`

Uses [React Portals API](https://reactjs.org/docs/portals.html) to render its children in `document.body`.

## Usage

```jsx
import {Portal} from 'libreact/lib/Portal';

<Portal>
  This will appear in a new node in document.body.
</Portal>
```

## Props

  - `el` &mdash; optional, DOM element, where to render children. If not provided, a new `<div>` element is created and
  appended to `document.body`.
