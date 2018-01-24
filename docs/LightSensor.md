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
