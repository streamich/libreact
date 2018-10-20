# `<TouchSupportSensor>`

[![React Universal Interface](https://img.shields.io/badge/React-Universal%20Interface-green.svg)](https://github.com/streamich/react-universal-interface)

Render prop that detects if touch interactions are available or not.
It's important to remember that touch detection can be [fallible](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

## Example

Use it as FaCC, attach to root element

```jsx
import {TouchSupportSensor} from 'libreact/lib/TouchSupportSensor';

<TouchSupportSensor>{({touchSupported}) =>
  <div>{touchSupported ? 'touch interactions available' : 'touch interactions not available'}</div>
}</TouchSupportSensor>
```

Use it as a plain function

```js
import { touchSupported } from 'libreact/lib/TouchSupportSensor';

console.log(touchSupported())
```


## Props

Prop signature

```ts
interface ITouchSupportSensorProps {
  onlyMouse?: boolean;
  onlyTouch?: boolean;
}
```

, where

  - `onlyMouse` - optional, boolean, will only render children if touch support is not detected.
  - `onlyTouch` - optional, boolean, will only render children if touch support is detected.
