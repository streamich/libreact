# `<Tween>`

Uses [`<Render>`](./Render.md) to re-render its children and applies an easing
to value to achieve different animation effects.


## Usage

```jsx
import {Tween} from 'libreact/lib/Tween';

<Tween ms={1000} easing='cubic'>{({value}) =>
  <div>Value: {value}</div>
}</Tween>
```


## Props

Accepts all the props of [`<Render>`](./Render.md) in addition to:

- `easing` &mdash; optional, easing function to apply, see below.
- `Render` &mdash; optional, component to use for rendering, defaults to [`<Render>`](./Render.md). You can also specify [`<RenderInterval>`](./RenderInterval.md).


## `easing` prop

`easing` defines a function to be applied to inbetweening value. It can be a string which represents one of the built-in easing functions or
you can provide your custom easing function.

If you provide your custom easing function: it receives a single normalized time argument, which is
guaranteed to be in the `[0...1]` inclusive range. The value returned by easing function is normalized
between `0` and `1`, too, but it does not have to be in that range. For example, if the easing function
returns a value greater than `1` it means the animation "overshoots" the target destination; this can be used
to create spring animations, as one example.

You can use one of the built-in easing functions simply specifying its name as a string:

- `linear` &mdash; no easing, no acceleration; this is the default easing, using it is equivalent to using `<Render>` directly.
- `quadratic` &mdash; accelerates fast, then slows quickly towards end.
- `cubic` &mdash; overshoots over 1 and then returns to 1 towards end.
- `elastic` &mdash; overshoots over 1 multiple times - wiggles around 1.
- `inSine` &mdash; accelerating from zero velocity.
- `outSine` &mdash; decelerating to zero velocity.
- `inOutSine` &mdash; accelerating until halfway, then decelerating.
- `inExpo` &mdash; exponential accelerating from zero velocity.
- `outExpo` &mdash; exponential decelerating to zero velocity.
- `inOutExpo` &mdash; exponential accelerating until halfway, then decelerating.
- `inCirc` &mdash; circular accelerating from zero velocity.
- `outCirc` &mdash; circular decelerating to zero velocity Moves very fast at the beginning and
then quickly slows down in the middle. This tween can actually be used
in continuous transitions where target value changes all the time,
because of the very quick start, it hides the jitter between target value changes.
- `inOutCirc` &mdash; circular acceleration until halfway, then deceleration.
- `inQuad` &mdash; accelerating from zero velocity
- `outQuad` &mdash; decelerating to zero velocity.
- `inOutQuad` &mdash; acceleration until halfway, then deceleration.
- `inCubic` &mdash; accelerating from zero velocity.
- `outCubic` &mdash; decelerating to zero velocity.
- `inOutCubic` &mdash; acceleration until halfway, then deceleration.
- `inQuart` &mdash; accelerating from zero velocity.
- `outQuart` &mdash; decelerating to zero velocity.
- `inOutQuart` &mdash; acceleration until halfway, then deceleration.
- `inQuint` &mdash; accelerating from zero velocity.
- `outQuint` &mdash; decelerating to zero velocity.
- `inOutQuint` &mdash; acceleration until halfway, then deceleration.


## Cubic-Bezier

You can create an easing function using Cubic-Bezier definition. Example:

```jsx
import {Tween} from 'libreact/lib/Tween';
import createBezierEasing from 'libreact/lib/Tween/createBezierEasing';

const myEasing = createBezierEasing(0, 1.66, .75, .78);

<Tween easing={myEasing}>{({value}) =>
  <div>Value: {value}</div>
}</Tween>
```


## `withTween` HOC

Enhancer that injects `tween` prop into your component.

```js
import {withTween} from 'libreact/lib/Tween';

const CompWithTween = withTween(Comp);
```


## `@withTween` decorator

Stateful component decorator that injects `tween` prop into your component.

```js
import {withTween} from 'libreact/lib/Tween';

@withTween
class MyComp extends Component {

}
```
