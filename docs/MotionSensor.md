# `<MotionSensor>`

Render-prop/FaCC that re-renders on device motion.


### Props

None.


### Example

```jsx
import {MotionSensor} from 'libreact/lib/MotionSensor';

<MotionSensor>{(state) =>
  JSON.strinfigy(state, null 4)
}</MotionSensor>
```

Result

```json
{
  "acceleration": {
    "x": null,
    "y": null,
    "z": null
  },
  "accelerationIncludingGravity": {
    "x": null,
    "y": null,
    "z": null
  },
  "rotationRate": {
    "alpha": null,
    "beta": null,
    "gamma": null
  },
  "interval": 16
}
```

## `withMotion()` HOC

HOC that merges `motion` prop into enhanced component's props.

```jsx
import {withMotion} from 'libreact/lib/MotionSensor';
```


## `@withMotion` decorator

React stateful component decorator that adds `motion` prop.

```js
import {withMotion} from 'libreact/lib/MotionSensor';

@withMotion
class MyComp extends Component {

}
```
