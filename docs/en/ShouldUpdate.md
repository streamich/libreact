# `<ShouldUpdate>`

Inverts `.shouldComponentUpdate()` life-cycle method. Allows you to use specify whether its children should update based
on passed in props.


## Usage

The below example will always re-render on new `data`, because `when` method always returns `true`.

```jsx
import {ShouldUpdate} from 'libreact/lib/ShouldUpdate';

<ShouldUpdate when={(newProps, oldProps) => true} props={data}>{(props) =>
  <div>Hello world!</div>
}</ShouldUpdate>
```


## Props

  - `when` &mdash; required, function, return boolean whether its children should re-render. Receives new and old props as two arguments.
  - `props` &mdash; required, object, props to pass to children.


## `shouldUpdate()` HOC

Higher order component that re-renders only when a condition is met.

```jsx
import {shouldUpdate} from 'libreact/lib/ShouldUpdate';

const PrintOver3 = shouldUpdate((props) => props.cnt > 3)(Print);
```

The above example creates a `PrintOver3` component that will re-render only when
`cnt` prop is greater than 3.


See also [`pure()`](./pure.md).
