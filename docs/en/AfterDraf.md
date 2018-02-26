# `<AfterDraf>`

Renders its children waiting twice for [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).
Useful to improving perceived performance of rendering.


## Usage

```jsx
import {AfterDraf} from 'libreact/lib/AfterDraf';

<AfterDraf>
  Hello world!
</AfterDraf>
```
