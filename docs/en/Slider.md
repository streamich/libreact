# `<Slider>`

Provides a "slider" behavior over any HTML element. Keeps state of weather user is currently
sliding and current sliding position of the slider. Supports, both, mouse and touch events.


## Usage

```jsx
import {Slider} from 'libreact/lib/Slider';

<Slider>{(state) =>
  <div style={{
    width: 800,
    height: 80,
    border: '1px solid tomato'
  }}>
    <pre style={{fontFamily: 'monospace'}}>
      {JSON.stringify(state, null, 4)}
    </pre>
  </div>
}</Slider>
```


## Props

Signature

```ts
interface ISliderProps {
  disabled?: boolean;
  onScrub?: (pos: number) => void;
  onScrubStart?: () => void;
  onScrubStop?: () => void;
  reverse?: boolean;
  value?: number;
  vertical?: boolean;
  throttle?: number;
}
```

, where

  - `disabled` &mdash; optional, boolean, whether slider should respond to user input. Defaults to `false`.
  - `onScrub` &mdash; optional, function, every time slider position is changed by user.
  - `onScrubStart` &mdash; optional, function, called when user start sliding.
  - `onScrubStop` &mdash; optional, function, called when user stops sliding.
  - `reverse` &mdash; optional, boolean, whether slider value computation should be inverted. Defaults to `false`.
  - `value` &mdash; optional, number, initial slider value. Defaults to `0`.
  - `vertical` &mdash; optional, boolean, whether to create vertical slider. Defaults to `false`.
  - `throttle` &mdash; optional, number, time in milliseconds used to throttle events. Defaults to `50`.


## State

Render prop receives the state of slider, which has the following signature

```ts
interface ISliderState {
  isSliding?: boolean;
  value?: number;
  pos?: number;
  length?: number;
}
```

, where

  - `isSliding` &mdash; whether user is currently scrubbing.
  - `value` &mdash; current scrubbing value in range `[0...1]`, only applicable when user is scrubbing.
  - `pos` &mdash; pixel position of mouse inside the element.
  - `length` &mdash; pixel size of the element.
