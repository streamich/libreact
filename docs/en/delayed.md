# `delayed()`

Works similar to [`lazy()`](./lazy.md) method but it can postpone loading or rendering of the component.

Delaying rendering is useful to prevent [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) in some cases, for example, if you
are using CSS modules with Webpack.

Delaying loading is useful if your component is not very important and you want to use CPU resources for other things or start loading the
component only on [browser idle time](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

Using default params with this function is equivalent to using [`lazy()`](./lazy.md) function.


## Examples

Lazy load a component and prevent [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

```jsx
const loader = () => import('./MyComponent'); // Assuming it is exports as default export.

const LazyMyComponent = lazy({
  loader,
  draf: true
});

<LazyMyComponent />
```

Lazy load an unimportant component only after 200ms after it was first rendered on browser idle time.

```jsx
const loader = () => import('./MyComponent'); // Assuming it is exports as default export.

const LazyMyComponent = lazy({
  loader,
  idle: true,
  delay: 200
});

<LazyMyComponent />
```


## Reference

`delayed()` works exactly as [`lazy()`](./lazy.md), but accepts these additional parameters.

- `delay` &mdash; time in milliseconds to wait before starting to load a component, defaults to `0`.
- `draf` &mdash; whether to wait for DRAF before rendering component after it has been loaded, useful to prevent [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) in some cases, if CSS is bundled with your component, defaults to `false`.
- `idle` &mdash; whether to start loading component on JavaScript idle time using `requestIdleCallback`, defaults to `false`.
