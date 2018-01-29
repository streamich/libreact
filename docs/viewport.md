# `viewport()`

Displays your component only after it appears in the viewport.

Before your component has appeared in viewport at least once it displays
a placeholder, which defaults to a transparent 1x1 pixel.

`viewport()` is a component enhancer with the following signature.

```ts
viewport: (Comp, params: IViewportParams) => React.ComponentClass;

interface IViewportParams {
  placeholder: React.ReactElement;
}
```

, where

  - `placeholder` - React element to render while this component is out of view.


## Usage

```jsx
import {viewport} from 'libreact/lib/viewport';

const MyCompEnhanced = viewport(MyComp);
```

## Example

Here we create a lazy loaded component, which is loaded only when it appears in the viewport.

```jsx
import {delayed} from 'libreact/lib/delayed';
import {viewport} from 'libreact/lib/viewport';


const loader = () => import('./MyComp');
const MyCompDelayed = delayed({loader});
const MyCompOnViewport = viewport(MyCompDelayed);

<MyCompOnViewport />
```
