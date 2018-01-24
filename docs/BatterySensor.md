# `BatterySensor`

Uses [`Navigator.getBattery()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery) API to track battery level, charging status and time it takes to charge/discharge a battery.

# Props

None.

# Example

```jsx
import {BatterySensor} from 'libreact/lib/BatterySensor';

<BatterySensor>{(battery) =>
  JSON.stringify(battery, null, 4)
}</BatterySensor>
```

Result

```json
{
    "charging": true,
    "level": 0.98,
    "chargingTime": 2040,
    "dischargingTime": null
}
```
