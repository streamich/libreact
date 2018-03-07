# `<WindowWidthQuery>`

Use it for responsive design, renders only the first child that matches query against
the current window width.


## Usage

```jsx
import {WindowWidthQuery} from 'libreact/lib/WindowWidthQuery';
import {View} from 'libreact/lib/View';

<WindowWidthQuery>
  <View maxWidth={300}>
    Up to 300px
  </View>
  <View>
    More than 300px
  </View>
</WindowWidthQuery>
```

`<WindowWidthQuery>` is simply a shortcut for

```jsx
<WindowSizeSensor>{({width}) =>
  <WidthQuery width={width}>
    {/* Your queries here... */}
  </WidthQuery>
}</WindowSizeSensor>
```
