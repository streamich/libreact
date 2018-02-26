# `<WhenIdle>`

Renders its children on [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).


## Usage

```jsx
import {WhenIdle} from 'libreact/lib/WhenIdle';

<WhenIdle timeout={100}>
  Hello world!
</WhenIdle>
```


## Props

- `timeout` &mdash; optional, number, `timeout` parameter to provide to `requestIdleCallback`.
