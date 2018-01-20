# `NetworkSensor`

FaCC that re-renders on network status change. Uses `navigator.onLine` and [`NetworkInformation`](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) to get network connection information.


## `<NetworkSensor>`

FaCC that passes through its state to child function

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
import {NetworkSensor} from 'mol-fe-react/lib/NetworkSensor';

<NetworkSensor>{(status) =>
  JSON.strinfigy(status, null 4)
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


## `withNetwork`

HOC that merges `<NetworkSensor>` state into props of the enhanced component.

### Example

```jsx
import {withNetwork} from 'mol-fe-react/lib/NetworkSensro';

const NetworkStatus = withNetwork((props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>
);
```
