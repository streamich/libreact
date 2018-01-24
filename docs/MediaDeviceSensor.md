# `<MediaDeviceSensor>`

Uses [`MediaDevices`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) to track
user's connected media devices.

## Usage

```jsx
import {MediaDevicesSensor} from 'libreact/lib/MediaDevicesSensor';

<MediaDevicesSensor>{(state) =>
  JSON.stringify(state, null, 4)
}</MediaDevicesSensor>
```
