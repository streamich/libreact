# `<Img>`

A wrapper around `<img>` element that accepts all `<img>` props and adds these additional ones:

- `renderLoad(img, props)` &mdash; render prop used to render content while image is being loaded
- `renderError(img, props)` &mdash; render prop used to render if image fails to load
- `$ref` &mdash; passed as `ref` to the underlying `<img>`


## Usage

```jsx
import {Img} from 'libreact/lib/Img';

<Img
  src="..."
  renderLoad={(img) => <div>Loading...{img}</div>}
  renderError={() => <div>Error happened</div>}
/>
```
