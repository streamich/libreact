# `<Modal>`

Creates a modal overlay. This component is similar to [`<Overlay>`](./Overlay.md) but provides the following extras:

- traps tabbing focus inside the overlay.
- makes all other root level elements inert to user input.
- sets aria title and description ids.

### Usage

Basic example.

```jsx
import {Modal} from 'libreact/lib/Modal';

<Modal>
  This is modal.
</Modal>
```

Set aria title and description.

```jsx
<Modal>{({idTitle, idDescription}) =>
  <div>
    <h1 id={idTitle}>My title</h1>
    <p id={idDescription}>This is description.</p>
  </div>
}</Modal>
```

Track when user intends to close the the modal.

```jsx
<Modal onClick={} onEsc={}>
  This is modal.
</Modal>
```


## Props

Accepts all [`<Overlay>`](./Overlay.md) props.

- `color` &mdash; optional, string, overlay color, defaults to `rgba(0, 0, 0, 0.5)`.
- `time` &mdash; optional, number, entrance opacity animation length in milliseconds, defaults to `300`.
- `onElement` &mdash; optional, callback that receives the DOM element overlay created.
- `onClick` &mdash; optional, callback, which is called when user click on overlay but not on its children.
- `onEsc` &mdash; optional, callback, called when user presses `Esc` button.


## State

`<Modal>` is a render prop that injects its state into the render function. State has the following keys.

- `idTitle` &mdash; id to set for aria title element.
- `idDescription` &mdash; id to set for aria description element.
