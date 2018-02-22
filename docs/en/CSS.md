# CSS

Vast majority of components in this library don't require any CSS. However, there are a few UI
components that need some basic styling. `libreact` uses [`freestyler`](https://github.com/streamich/freestyler) to
style those UI components and also exposes `freestyler` for convenience, so you can use it, too.

```js
import {
  css,
  styled,
  jsxstyle,
  rule,
  StyleSheet
} from 'libreact/lib/css';
```

Below are listed supported interfaces. Read more about [CSS-in-JS generations](https://github.com/streamich/freestyler#reference).

- 3<sup>rd</sup> generation &mdash; [`rule()`](./css/rule.md) and [`StyleSheet.create()`](./css/StyleSheet.md)
- 4<sup>th</sup> generation &mdash; [`@css`](./css/css.md) and [`styled()()`](./css/styled.md)
- 5<sup>th</sup> generation &mdash; [`jsxstyle()`](./css/jsxstyle.md)
