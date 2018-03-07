# `<WidthQuery>`

Renders only one of its children that matches width query.

## Usage

```jsx
import {WidthQuery} from 'libreact/lib/WidthQuery';
import {View} from 'libreact/lib/View';

<WidthQuery width={400}>
  <View maxWidth={300}>
    This will not render.
  </View>
  <View>
    This will render!
  </View>
</WidthQuery>
```


## Props

- `width` &mdash; required, number, width value to match queries against.


## Children

Children of `<ViewQuery>` must be an array of at least two React elements.
Use `minWidth` and `maxWidth` properties to match against the width, first
matched child will be rendered. You can use any react component as children
or the [`<View>`](./View.md) wrapper component that is simply a shell that just
renders its children.
