# `<Dimmable>`

Dims element similar to [`<Dimmer>`](./Dimmer.md), with additional features:

- Works on server side.
- Sets `aria-hidden="true"`, if element is dimmed.
- Sets `pointer-events: none`, if element is dimmed.
- Blurs dimmed element.


## Usage

```jsx
import {Dimmable} from 'libreact/lib/Dimmable';

<Dimmable dim renderOverlay={(dim) => 'Overlay...'}>
  <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
    Inline...
  </div>
</Dimmable>
```


## Props

Accepts all [`<Dimmer>` props](./Dimmer.md#props) (except `hidden`, use `dim` instead) in addition to its own:

- `dim` &mdash; optional, boolean, whether to show dim overlay, defaults to `false`.
- `blur` &mdash; optional, number, blur intensity in `px` when dimmed, defaults to `5`.
- `renderOverlay` &mdash; optional, function, returns contents to render in overlay when element is dimmed.
Receives a single argument &mdash; boolean, whether element is dimmed.
