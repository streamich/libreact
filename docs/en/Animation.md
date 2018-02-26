# Animation

Below primitives are available to do basic animation in JavaScript.

- [`<AfterTimeout>`](./AfterTimeout.md) &mdash; renders children after a timeout.
- [`<AfterDraf>`](./AfterDraf.md) &mdash; renders children after double `requestAnimationFrame`.
- [`<WhenIdle>`](./WhenIdle.md) &mdash; renders children on browser idle time.
- [`<Render>`](./Render.md) &mdash; re-renders children on every `requestAnimationFrame`.
- [`<RenderInterval>`](./RenderInterval.md) &mdash; re-renders children at a specified frame rate per second.
- [`<Tween>`](./Tween.md) &mdash; applies an easing function to animation duration value from `<Render>`.
- [`<Interpolation>`](./Interpolation.md) &mdash; interpolates a map of values using a `<Tween>`.
