# CSS Resets

CSS reset components `<CssReset*>` provide a handy way to include CSS reset in your app.
You simply need to render the css reset component somewhere in your JSX tree for it to take effect.

```jsx
import CssResetEricMeyer from 'libreact/lib/reset/CssResetEricMeyer';

const App = () =>
  <div>
    <CssResetEricMeyer />
    { /* ... */ }
  </div>
```

When you un-mount a CSS reset component it will also remove the CSS automatically.

Below is a list of included CSS resets.

  - [`<CssResetEricMeyer>`](./reset/CssResetEricMeyer.md)
  - [`<CssResetEricMeyerCondensed>`](./reset/CssResetEricMeyerCondensed.md)
  - [`<CssResetMinimalistic>`](./reset/CssResetMinimalistic.md)
  - [`<CssResetMinimalistic2>`](./reset/CssResetMinimalistic2.md)
  - [`<CssResetMinimalistic3>`](./reset/CssResetMinimalistic3.md)
  - [`<CssResetPoorMan>`](./reset/CssResetPoorMan.md)
  - [`<CssResetShaunInman>`](./reset/CssResetShaunInman.md)
  - [`<CssResetSiolon>`](./reset/CssResetSiolon.md)
  - [`<CssResetTantek>`](./reset/CssResetTantek.md)
  - [`<CssResetUniversal>`](./reset/CssResetUniversal.md)
  - [`<CssResetYahoo>`](./reset/CssResetYahoo.md)
