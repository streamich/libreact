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

Set aria title, description, and close button.

```jsx
<Modal>{({idTitle, idDescription, close}) =>
  <div>
    <h1 id={idTitle}>My title</h1>
    <p id={idDescription}>This is description.</p>

    <button onClick={close}>Cancel</button>
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

Accepts all [`<Overlay>`](./Overlay.md) props in addition to:

- `dontLockFocus` &mdash; optional, boolean, does not jail tabbing focus if true, defaults to `false`.
- `onEsc` &mdash; optional, callback, called when user presses `Esc` button.
- `onClose` &mdash; optional, callback, called when `close()` is executed.


## State

`<Modal>` is a render prop that injects its state into the render function. State has the following keys.

- `close()` &mdash; method to calle `onClose` event.
- `idTitle` &mdash; id to set for aria title element.
- `idDescription` &mdash; id to set for aria description element.

Root nodes with `data-modal-ignore` attribute will not be dirty mutated (to create blur effect).
