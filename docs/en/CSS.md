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

Below are listed supported interfaces.

- 3<sup>rd</sup> generation: [`rule()`](./css/rule.md), [`StyleSheet.create()`](./css/StyleSheet.md)
- 4<sup>th</sup> generation: [`@css`](./css/css.md), [`styled()()`](./css/styled.md)
- 5<sup>th</sup> generation: [`jsxstyle()`](./css/jsxstyle.md)


> Read more about [CSS-in-JS generations](https://github.com/streamich/freestyler#reference).
