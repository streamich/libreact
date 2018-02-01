# `<CssResetTantek>`

## Usage

Simply render it in your React app

```jsx
import CssResetTantek from 'libreact/lib/reset/CssResetTantek';

<CssResetTantek />
```

## Contents

```js
{
  ':link,:visited': {
    td: 'none',
  },
  'ul,ol': {
    'list-style': 'none',
  },
  'h1,h2,h3,h4,h5,h6,pre,code,p': {
    fz: '1em',
  },
  'ul,ol,dl,li,dt,dd,h1,h2,h3,h4,h5,h6,pre,form,body,html,p,blockquote,fieldset,input': {
    pad: 0,
    mar: 0,
  },
  'a img,:link img,:visited img': {
    bd: 'none',
  },
  address: {
    fs: 'normal',
  },
}
```
