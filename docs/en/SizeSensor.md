# `SizeSensor`

FaCC that tracks width and height of its children.

## Example

Use it as FaCC

```jsx
import {SizeSensor} from 'libreact/lib/SizeSensor';

<SizeSensor>{({width, height}) =>
  `WIDTH: ${width}, HEIGHT: ${height}`
}</SizeSensor>
```

Or use `onSize` prop

```jsx
import {SizeSensor} from 'libreact/lib/SizeSensor';

<SizeSensor onSize={({width, height}) => console.log(width, height)}>
  Resize me!
</SizeSensor>
```


## `withSize()` HOC

HOC that merges `size` prop into enhanced component's props.

```jsx
import {withSize} from 'libreact/lib/SizeSensor';

const MyComp = (props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>;

const MyCompWithSize = withSize(MyComp);

<MyCompWithSize />
```

You can overwrite the inject prop name

```js
const MyCompWithDimensions = withSize(MyComp, 'dimensions');
```

Or simply merge the whole object into your props

```js
const MyCompWithSize = withSize(MyComp, '');
```

## `@withSize` decorator

React stateful component decorator that adds `size` prop.

```js
import {withSize} from 'libreact/lib/SizeSensor';

@withSize
class MyComp extends Component {

}
```

Specify different prop name

```js
@withSize('dimensions')
class MyComp extends Component {

}
```

or merge the the whole size object into props

```js
@withSize('')
class MyComp extends Component {

}
```
