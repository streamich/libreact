# `<Img>`

A wrapper around `<img>` element that accepts all `<img>` props and adds these two additional ones:

- `renderLoad(img, props)` &mdash; render prop used to render content while image is being loaded
- `renderError(img, props)` &mdash; render prop used to render if image fails to load


## Usage

```jsx
import {Img} from 'libreact/lib/Img';

<Img
  src="..."
  renderLoad={() => <div>Loading...</div>}
  renderError={() => <div>Error happened</div>}
/>
```
