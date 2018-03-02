# `<ScratchSensor>`

Tracks user "scratches" or swipes.


## Usage

```jsx
import {ScratchSensor} from 'libreact/lib/ScratchSensor';

<ScratchSensor>{(state) =>
  <div style={{
    width: 300,
    height: 300,
    border: '1px solid tomato',
  }}>
    <pre style={{fontFamily: 'monospace'}}>
      {JSON.stringify(state, null, 4)}
    </pre>
  </div>
}</ScratchSensor>
```


## Props

- `bond` &mdash; optional, boolean or string, bonding name to provide as data prop.
- `disabled` &mdash; optional, boolean, whether to not track scratches.


## State

Render prop receives an object with the following signature.

```ts
interface IScratchSensorState {
  isScratching?: boolean;
  start?: number;
  end?: number;
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
  docX?: number;
  docY?: number;
  posX?: number;
  posY?: number;
  elH?: number;
  elW?: number;
  elX?: number;
  elY?: number;
}
```


## `withScratch()` HOC

Injects `scratch` prop into your component.

```js
import {withScratch} from 'libreact/lib/ScratchSensor';

const MyCompWithScratch = withScratch(MyComp);
```

## `@withScratch` decorator

Injects `scratch` prop into your component.

```js
import {withScratch} from 'libreact/lib/ScratchSensor';

@withScratch
class MyComp extends Component {

}
```
