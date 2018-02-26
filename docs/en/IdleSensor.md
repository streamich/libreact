# `<IdleSensor>`

Tracks if use is active on the page. If user does not perform any events on the page
during a specified timeout, `IdleSensor` fires an event and changes its state.

Uses these events to track user activity:

```js
['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel', 'visibilitychange']
```

All events, except `visibilitychange`, are fired by `window` object and the list can
be set in props.


## Usage

```jsx
import {IdleSensor} from 'libreact/lib/IdleSensor';

<IdleSensor ms={10000} onChange={(idle) => console.log(idle)}>
  {({idle}) =>
    <div>
      User is idle: {idle ? 'TRUE' : 'FALSE'}
    </div>
  }
</IdleSensor>
```


## Props

Signature

```ts
interface IIdleSensorProps {
  events?: string[];
  ms?: number;
  onChange?: (idle: boolean) => void;
  throttle?: number;
}
```

, where

- `events` &mdash; optional, list of `window` events to listen to.
- `ms` &mdash; optional, number, time in milliseconds after which to consider user idle, defaults to `1000 * 60 * 2`.
- `onChange` &mdash; optional, callback, fires when `IdleSensor` changes its state, receives a single boolean argument.
- `throttle` &mdash; optional, number, time in milliseconds used to throttle events, defaults to `50`. This prop cannot be changed dynamically.


## `withIdle()` HOC

Enhancer that injects `idle` prop into your component.


## `@withIdle` decorator

Stateful component class decorator that injects `idle` prop.
