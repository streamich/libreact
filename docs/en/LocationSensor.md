# `<LocationSensor>`

FaCC that uses [`Window.location`](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)  and
[`Window.history`](https://developer.mozilla.org/en-US/docs/Web/API/Window/history) APIs to track
page location and re-render on any changes.

## Usage

```jsx
import {LocationSensor} from 'libreact/lib/LocationSensor';

<LocationSensor>{(location) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(location, null, 4)}
  </pre>
}</LocationSensor>
```

## Props

None.

## Reference

Returns location state object with the following signature

```ts
interface ILocationSensorState {
  trigger: string;
  state?: any;
  length?: number;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
}
```


## `withLocation()` HOC

Higher order component that injects `location` prop into your component.

```js
import {withLocation} from 'libreact/lib/LocationSensor';

const MyCompWithLocation = withLocation(MyComp);
```

Overwrite the inject prop name

```js
const MyCompWithLocation = withLocation(MyComp, 'route');
```

or merge all props

```js
const MyCompWithLocation = withLocation(MyComp, '');
```


## `@withLocation` decorator

Stateful component class decorator that injects `location` prop into your component.

```js
import {withLocation} from 'libreact/lib/LocationSensor';

@withLocation
class MyComp extends Component {

}
```

Overwrite prop name

```js
@withLocation('route')
class MyComp extends Component {

}
```

or merge all props

```js
@withLocation('')
class MyComp extends Component {

}
```
