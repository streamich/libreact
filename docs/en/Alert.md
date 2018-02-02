# `<Alert>`

Uses [`Window.alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) to display message to a user.

## Usage

```jsx
import {Alert} from 'libreact/lib/Alert';

<Alert show text='Hello world' />
```

## Props

  - `show` - boolean, optional, whether to show the alert.
  - `text` - string, require, string message to display to the user.
