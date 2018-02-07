# `<MouseSensor>`

Render prop that re-renders on mouse position change.


## Usage

```jsx
import {MouseSensor} from 'libreact/lib/MouseSensor';

<MouseSensor>{(state) =>
  <pre>{JSON.stringify(state, null, 4)}</pre>
}</MouseSensor>
```


## Reference

`MouseSensor` passes its state to render props, with the following signature:

```ts
interface IMouseSensorState {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elH: number;
  elW: number;
  elX: number;
  elY: number;
}
```

, where

  - `docX` and `docY` &mdash; mouse position in document.
  - `posX` and `posY` &mdash; mouse position in your element.
  - `elW` and `elH` &mdash; element dimensions.
  - `elX` and `elY` &mdash; element position.

### Props

```ts
interface IMouseSensorProps {
  bond?: string | boolean;
  whenHovered?: boolean;
}
```

, where

  - `bond` &mdash; optional, boolean or string, specifying bondig spread object. If string, it specifies the name of the bonding object injected into state, if boolean and true the bonding object will have its default name `bond`.
  - `whenHovered` - optional, boolean, when true, will track mouse position only when target element is hovered, defaults to `false`.

### Example

Below is an example that uses optional `bond` prop, which allows to attach listeners to any React HTML element.

```jsx
import {MouseSensor} from 'libreact/lib/MouseSensor';

<MouseSensor bond>{(state) =>
  <div>
    <div {...state.bond} style={{
      width: 300,
      height: 300,
      border: '1px solid tomato',
      margin: '100px'
    }} />
    <pre style={{fontFamily: 'monospace'}}>
      {JSON.stringify(state, null, 4)}
    </pre>
  </div>
}</MouseSensor>
```

Result example

```json
{
    "docX": 128,
    "docY": 277,
    "posX": 108,
    "posY": 100,
    "elH": 302,
    "elW": 302,
    "elX": 20,
    "elY": 177,
}
```

## `withMouse()` HOC

HOC that merges `mouse` prop into enhanced component's props.

```jsx
import {withMouse} from 'libreact/lib/MouseSensor';

const MyCompWithMouseAndBond = withMouse(MyComp);
```

You can overwrite the injected prop name

```js
const MyCompWithMouseAndBond = withMouse(MyComp, 'foo');
```

Or simply merge the whole object into your props

```js
const MyCompWithMouseAndBond = withMouse(MyComp, '');
```


## `@withMouse` decorator

React stateful component decorator that adds `mouse` prop.

```js
import {withMouse} from 'libreact/lib/MouseSensor';

@withMouse
class MyComp extends Component {

}
```

Specify different prop name

```js
@withMouse('foo')
class MyComp extends Component {

}
```

or merge the the whole state object into props

```js
@withMouse('')
class MyComp extends Component {

}
```
