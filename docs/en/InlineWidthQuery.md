# `<InlineWidthQuery>`

Use it for responsive design, renders only the first child that matches query against
the current available width of this element.

It is similar to [`<WindowWidthQuery>`](./WindowWidthQuery.md), but instead of using
the browser window width, it detects the available inline width of the current element.


## Usage

```jsx
import {InlineWidthQuery} from 'libreact/lib/InlineWidthQuery';
import {View} from 'libreact/lib/View';

<InlineWidthQuery>
  <View maxWidth={300}>
    Up to 300px
  </View>
  <View>
    More than 300px
  </View>
</InlineWidthQuery>
```

`<InlineWidthQuery>` is simply a shortcut for

```jsx
<SizeSensor>{({width}) =>
  <div>
    <WidthQuery width={width}>
      {/* Your queries here... */}
    </WidthQuery>
  </div>
}</SizeSensor>
```
