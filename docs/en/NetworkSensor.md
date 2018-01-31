# `<NetworkSensor>`

FaCC that re-renders on network status change. Uses `navigator.onLine` and [`NetworkInformation`](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) to get network connection information.


## Reference

Passes through its state to the `children` function

```ts
interface INetworkSensorState {
  online?: boolean;
  since?: Date;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: string;
  rtt?: number;
  type?: string;
}
```

### Props

None.

### Example

```jsx
import {NetworkSensor} from 'libreact/lib/NetworkSensor';

<NetworkSensor>{(state) =>
  JSON.strinfigy(state, null 4)
}</NetworkSensor>
```

Result

```json
{
    "online": true,
    "since": "2018-01-20T14:20:43.063Z",
    "downlink": 2.4,
    "effectiveType": "4g",
    "rtt": 100
}
```

, where

  - `online` - boolean, whether user is connected.
  - `since` - time when `online` property last changed, is set to `null` in the beginning.
  - `downlink`, `downlinkMax`, `effectiveType`, `type`, `rtt` - properties as provided by [`NetworkInformation`](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation).


## `withNetwork()` HOC

HOC that merges `net` prop into enhanced component's props.

```jsx
import {withNetwork} from 'libreact/lib/NetworkSensor';

const NetworkStatusFormatter = (props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>;

const NetworkStatus = withNetwork(NetworkStatusFormatter);

<NetworkStatus />
```

You can overwrite the injected prop name

```js
const NetworkStatus = withNetwork(NetworkStatusFormatter, 'network');
```

Or simply merge the whole object into your props

```js
const NetworkStatus = withNetwork(NetworkStatusFormatter, '');
```

## `@withNetwork` decorator

React stateful component decorator that adds `net` prop.

```js
import {withNetwork} from 'libreact/lib/NetworkSensor';

@withNetwork
class MyComp extends Component {

}
```

Specify different prop name

```js
@withNetwork('network')
class MyComp extends Component {

}
```

or merge the the whole network object into props

```js
@withNetwork('')
class MyComp extends Component {

}
```
