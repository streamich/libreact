# `<GeoLocationSensor>`

Render-prop/FaCC that re-renders on device location change, uses [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation) API.


### Props

None.


### Example

```jsx
import {GeoLocationSensor} from 'libreact/lib/GeoLocationSensor';

<GeoLocationSensor>{(state) =>
  JSON.strinfigy(state, null 4)
}</GeoLocationSensor>
```

Result

```json
{
    "accuracy": 86,
    "altitude": null,
    "altitudeAccuracy": null,
    "heading": null,
    "latitude": 54.4,
    "longitude": -0.3,
    "speed": null,
    "timestamp": 1517137742896
}
```

## `withGeoLocation()` HOC

HOC that merges `geoLocation` prop into enhanced component's props.

```jsx
import {withGeoLocation} from 'libreact/lib/GeoLocationSensor';
```


## `@withGeoLocation` decorator

React stateful component decorator that adds `geoLocation` prop.

```js
import {withGeoLocation} from 'libreact/lib/GeoLocationSensor';

@withGeoLocation
class MyComp extends Component {

}
```
