# `<Iframe>`

Renders an `<iframe>` and mounts React children into the iframe's own document using a React portal.

## Usage

```jsx
import {Iframe} from 'libreact/lib/Iframe';

<Iframe title="Preview">
  <button onClick={() => console.log('Clicked inside iframe')}>
    Click me
  </button>
</Iframe>
```

The children keep their React event handlers because they are rendered through React's portal API.

## Props

Accepts all native `<iframe>` props in addition to:

- `onElement` &mdash; optional callback called with the iframe element.
- `onContentDocument` &mdash; optional callback called with the iframe document when it is ready.
