# `<OrientationSensor>`

Tracks screen orientation using [`orientationchange` event](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange).

## Usage

```jsx
import {OrientationSensor} from 'libreact/lib/OrientationSensor';

<OrientationSensor>(state) =>
  <pre>{JSON.stringify(state, null, 4)}</pre>
</OrientationSensor>
```

## Props

None.

## State

Has signature

```ts
interface IOrientationSensorState {
  angle: number;
  type: string;
}
```

, where

  - `angle` - screen rotation angle in degrees.
  - `type` - is one of `portrait-primary`, `portrait-secondary`, `landscape-primary`, or `landscape-secondary`.


## `withOrientation()` HOC

HOC that merges `orientation` prop into enhanced component's props.

```jsx
import {withOrientation} from 'libreact/lib/OrientationSensor';
```


## `@withOrientation` decorator

React stateful component decorator that adds `orientation` prop.

```js
import {withOrientation} from 'libreact/lib/OrientationSensor';

@withOrientation
class MyComp extends Component {

}
```
