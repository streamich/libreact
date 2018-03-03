# `<ClassNames>`

Side-effect component that when mounted sets class names on a given DOM element
and removes them, when it is being unmounted.


## Usage

```jsx
import {ClassNames} from 'libreact/lib/ClassNames';

<ClassNames list={['some-class', 'another-class']} />
```


## Props

- `list` &mdash; required, array of string, list of class names to set.
- `el` &mdash; optional, DOM element on which to set the class names, defaults to `document.body`.
- `persist` &mdash; optional, boolean, whether to keep the class names when component un-mounts, defaults to `false`.
