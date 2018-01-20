# `BatterySensor`

Tracks battery level, charging status and time it takes to charge/discharge a battery.

# Props

None.

# Example

```jsx
import {BatterySensor} from 'mol-fe-react/lib/BatterySensor';

<BatterySensor>{(battery) =>
  JSON.stringify(battery, null, 4)
}</BatterySensor>
```
