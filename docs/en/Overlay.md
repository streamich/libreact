# `<Overlay>`

Creates overlay over whole page.


## Usage

```jsx
import {Overlay} from 'libreact/lib/Overlay';

<Overlay>
  This is rendered over the whole page.
</Overlay>
```


## Props

- `color` &mdash; optional, string, overlay color, defaults to `rgba(0, 0, 0, 0.5)`.
- `time` &mdash; optional, number, entrance opacity animation length in milliseconds, defaults to `300`.
- `onElement` &mdash; optional, callback that receives the DOM element overlay created.
- `onClick` &mdash; optional, callback, which is called when user click on overlay but not on its children.
