# `<Vibrate>`

Use [`navigator.vibrate()`](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) to generate
device vibrations.

## Props

  - `ms` - time in milliseconds for how long to vibrate. Can be a single number, or an array of numbers.
  If array of numbers is specified, every second value is used a vibration lenght and values in between
  are considered pauses between the vibrations.

## Example

```jsx
import {Vibrate} from 'libreact/lib/Vibrate';

<Vibrate ms={200} />
<Vibrate ms={[100, 100, 100, 100, 100]} />
```
