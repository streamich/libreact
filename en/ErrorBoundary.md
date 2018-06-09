# `<ErrorBoundary>`

Creates an error boundary, using [React's `.componentDidCatch()` API](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html).

## Usage

```jsx
import {ErrorBoundary} from 'libreact/lib/ErrorBoundary';

<ErrorBoundary
  renderError={({error, info}) => <div>ERROR!</div>}
  onError={({error, info}) => {/* ... */}}
>
  <div>
    This code is protected by error boundary.
  </div>
</ErrorBoundary>
```

## Props

Signature

```ts
interface IErrorBoundaryProps {
  renderError?: (state: IErrorBoundaryState) => React.ReactElement;
  onError?: (error?: Error, info?) => void;
}

interface IErrorBoundaryState {
  error?: Error;
  info?: any;
}
```

, were

  - `renderError` &mdash; renderer called if error happened in error boundary's children.
  - `onError` &mdash; event called every time error detected.


## `withErrorBoundary` HOC

Wraps your component into an error boundary.

```jsx
import {withErrorBoundary} from 'libreact/lib/ErrorBoundary';

const SafeComponent = withErrorBoundary(UnsafeComponent, {
  renderError: () => <div>Error happened!</div>
});
```

Signature

```ts
withErrorBoundary(Comp, boundaryProps: IErrorBoundaryProps)
```
