# `<LightSensor>`

Ues [`AmbientLightSensor`](https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor) API
to privide lightning data.

## Usage

```jsx
import {LightSensor} from 'libreact/lib/LightSensor';

<LightSensor>{(light) =>
  JSON.stringify(light, null, 4)
}</LightSensor>
```


## `withLight()` HOC

Higher order component that injects `illumination` prop into your component.

```js
import {withLight} from 'libreact/lib/LightSensor';

const MyCompWithLight = withLight(MyComp);
```


## `@withLight` HOC

Class decorator that injects `illumination` prop into your component.

```js
import {withLight} from 'libreact/lib/LightSensor';

@withLight
class MyComp extends Component {

}
```
