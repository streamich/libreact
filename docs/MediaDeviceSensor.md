# `<MediaDeviceSensor>`

Uses [`MediaDevices`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) to track
user's connected media devices.

## Usage

```jsx
import {MediaDeviceSensor} from 'libreact/lib/MediaDeviceSensor';

<MediaDeviceSensor>{(state) =>
  JSON.stringify(state, null, 4)
}</MediaDeviceSensor>
```


## `withMediaDevices()`

Higher order component that injects `devices` prop into your component.

```js
import {withMediaDevices} from 'libreact/lib/MediaDeviceSensor';

const MyCompDevices = withMediaDevices(MyComp);
```


## `@withMediaDevices`

Stateful component class decorator that injects `devices` prop into your component.

```js
import {withMediaDevices} from 'libreact/lib/MediaDeviceSensor';

@withMediaDevices
class MyComp extends Component {

}
```
