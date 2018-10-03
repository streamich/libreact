# `<BatterySensor>`

[![React Universal Interface](https://img.shields.io/badge/React-Universal%20Interface-green.svg)](https://github.com/streamich/react-universal-interface)

Uses [`Navigator.getBattery()`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery) API to track battery level, charging status and time it takes to charge/discharge a battery.

## Props

None.

## Example

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

## `withBattery()`

Higher order component that injects `battery` prop into your component.

```js
import {withBattery} from 'libreact/lib/BatterySensor';

const MyCompWithBattery = withBattery(MyComp);
```

Overwrite the inject prop name

```js
const MyCompWithBattery = withBattery(MyComp, 'myBattery');
```

or merge the props

```js
const MyCompWithBattery = withBattery(MyComp, null);
```


## `@withBattery`

Stateful component class decorator that injects `battery` prop into your component.

```js
import {withBattery} from 'libreact/lib/BatterySensor';

@withBattery
class MyComp extends Component {

}
```
