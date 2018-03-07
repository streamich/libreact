# `<Dimmer>`

Dims or create an overlay over its parent element.


## Usage

```jsx
import {Dimmer} from 'libreact/lib/Dimmer';

<div style={{width: 500, height: 300, border: '1px solid tomato'}}>
  Inline...
  <Dimmer>
    Children...
  </Dimmer>
</div>
```


## Props

- `color` &mdash; optional, string, overlay color, defaults to `rgba(0,0,0,0.5)`.
- `ms` &mdash; optional, number, background color appearance animation time in milliseconds, defaults to `300`.
- `hidden` &mdash; optional, boolean, whther to hide dim overlay.
