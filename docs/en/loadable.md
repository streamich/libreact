# `loadable()`

`loadable()` is a higher-order-component that creates a component which waits for a promise to resolve before rendering its returned component.

```jsx
const LoaderComponent = loadable({
  loader: () => new Promise((resolve) => resolve(Component))
});

<LoaderComponent />

LoaderComponent.load();
```

The code above will render `Component` component when the promise resolves. `loadable()` creates a [mock()](./mock.md) component whose
implementation is loaded using `.load()` method is called, instead of explicitly setting it by `.implement()`.

To start promise resolution, you have to call `.load()` method. This function still requires you to explicitly call `.load()` method, instead you might be interested in
[`lazy()`](./lazy.md) or [`delayed`](./delayed.md) functions, which call the `.load()` method automatically for you.


## Example

Create a loadable React component and immediately load it.

```jsx
import {loadable} from 'libreact/lib/loadable';

// Here we assume it is exported as default exports.
const loader = () => import('./path/to/image.svg');

const SVGImage = loadable({
  loader
});

<SVGImage />

SVGImage.load();
```

If your component is not exported as default exports, you need to "return" it.

```js
const LoadableComp = loadable({
  loader: () => import('./MyComp').then(module => module.MyComp)
});
```

You can specify a component to be displayed while loading.

```js
const AppLoadable = loadable({
  loader: () => import('./MyApp'),
  loading: 'Loading...',
});
```

or

```js
const AppLoadable = loadable({
  loader: () => import('./MyApp'),
  loading: AppLoadingSpinner,
});
```

Also, you can specify a component to be displayed on error.

```js
const AppLoadable = loadable({
  loader: () => import('./MyApp'),
  error: (error) => {
    console.error('Error happened while loading', error);
    return AppLoadingErrorComponent;
  },
});
```
