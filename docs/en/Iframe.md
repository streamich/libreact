# `<Iframe>`

Renders its children inside the iframe document using a React portal. Child React elements keep their event handlers, so interactive components can be rendered in an isolated iframe.

## Usage

```jsx
import {Iframe} from 'libreact/lib/Iframe';

<Iframe title="Isolated content">
  <button onClick={() => alert('clicked')}>Click me</button>
</Iframe>
```

## Props

All standard `<iframe>` props are passed through to the rendered iframe element.

- `children` — React elements rendered into the iframe's `document.body`.
- `onElement` — optional callback receiving the iframe element.
