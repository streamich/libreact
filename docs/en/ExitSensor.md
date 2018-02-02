# `<ExitSensor>`

Allows you to show an "exit" animation when un-mounting your component.

An `exiting` prop with value `true` will be injected in your component when it is being unmounted.

`ExitSensor` expects a single child component with `key` prop specified. The `key`
prop is used to identify components.


## Usage

```jsx
import {ExitSensor} from 'libreact/lib/ExitSensor';

<ExitSensor time={200}>
  {isRectangle ? <Rectangle key='rect' /> : <Circle key='circ' />}
</ExitSensor>
```

, where

```jsx
const Rectangle = ({exiting}) => {
  return (
    <div style={{
      opacity: exiting ? 0 : 1
      transition: 'all 0.5s',
      width: 200,
      height: 200,
      background: 'tomato',
    }} />
  );
};
```


## Props

  - `time` &mdash; number, optional, time in milliseconds how long to still show the old
  component after it has been replaced by a new one. Defaults to `200`.
