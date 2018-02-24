# `<AfterTimeout>`

Renders its children only after a specified timeout. Useful to
improving perceived performance by not blocking the main event loop.


## Usage

```jsx
import {AfterTimeout} from 'libreact/lib/AfterTimeout';

<AfterTimeout ms={100}>
  Hello world!
</AfterTimeout>
```


## Props

- `ms` &mdash; optional, number, time in milliseconds after which to render children, defaults to `200`.
