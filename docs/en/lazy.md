# `lazy()`

Creates a [`loadable()`](./loadable.md) component which is loaded automatically when it is rendered for the first time.
Basically, this utility calls `.load()` method or a loadable component automatically, when it is being rendered for the first time.

Use it exactly the same as `loadable()`, the only difference is that it will automatically `.load()` on first render.

However, you still have access to the `.load()` method, which allows you *"pre-load"* your components ahead of time, if necessary.
This ways &mdash; when your component is rendered for the first time &mdash; you will not experience a network delay.


## Example

Below `MyComponent` will be resolved and rendered in place of `LazyMyComponent`.

```jsx
const loader = () => new Promise(resolve => resolve(MyComponent));

const LazyMyComponent = lazy({loader});

<LazyMyComponent />
```

This feature allows you to do code-splitting &mdash; to load your components only when they are actually rendered for the first time.
Below code will load and render `MyComponent` in place of `LazyMyComponent`, but only when `LazyMyComponent` was actually rendered for
the first time.

```jsx
const loader = () => import('./MyComponent'); // Assuming it is exports as default export.

const LazyMyComponent = lazy({loader});

<LazyMyComponent />
```

Above code assumes your component was exported as default exports, if its not you would modify your code as so:

```jsx
const loader = () => import('./MyComponent').then(module => module.MyComponent);

const LazyMyComponent = lazy({loader});

<LazyMyComponent />
```

You can also use `.load()` method, to pre-load your component ahead of time.

```js
LazyMyComponent.load();
```

By default, while your component is loading, nothing will be rendered, but you can display a loading text instead.

```js
const LazyMyComponent = lazy({
  loader,
  loading: 'MyComponent is loading...'
});
```

Or any other React component:

```js
const LazyMyComponent = lazy({
  loader,
  loading: <LoadingSpinner />
});
```

If error happens during loading, and `.error()` param is called, it receives a single error argument, and expects back
a component to be rendered on error, or `null`.

```js
const LazyMyComponent = lazy({
  loader,
  loading: <LoadingSpinner />,
  error: (error) => {
    console.error('Error while loading MyComponent: ', error);

    return LoadingError;
  },
});
```

For more features see [`delayed`](./delayed.md) higher-order-component, which works the same as `lazy()` but provides
more options.
