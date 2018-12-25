# `<InfiniteScroll>`

Fires `loadMore` prop when end of content becomes visible.


## Usage

```jsx
import {InfiniteScroll} from 'libreact/lib/InfiniteScroll';

<InfiniteScroll
  hasMore={true || false}
  cursor={cursor}
  loadMore={() => {/* ... */}}
>
  {items}
</InfiniteScroll>
```


## Props

- `loadMore` &mdash; required, function that is called when user scrolls to the bottom of the component.
- `cursor` &mdash; required, unique identifier of current page, `loadMore` is called only once for each adjacent unique value of `cursor`.
- `hasMore` &mdash; optional, boolean, whether there are more items to load, if set to `false`, `loadMore` will not be called.
- `sentinel` &mdash; optional, React element to render at the bottom of the component, when this element becomes visible it triggers `loadMore` function, defaults to empty `<div>` pixel.
- `margin` &mdash; optional, number, invisible margin before `sentinel` when to already call `loadMore` before `sentinel` is visible, defaults to `100`.
