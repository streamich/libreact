# `<CssResetYahoo>`

## Usage

Simply render it in your React app

```jsx
import CssResetYahoo from 'libreact/lib/reset/CssResetYahoo';

<CssResetYahoo />
```

## Contents

```js
{
  'body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,p,blockquote,th,td': {
    pad: 0,
    mar: 0,
  },
  table: {
    'border-collapse': 'collapse',
    'border-spacing': 0,
  },
  'fieldset,img': {
    bd: 0,
  },
  'address,caption,cite,code,dfn,em,strong,th,var': {
    fw: 'normal',
    fs: 'normal',
  },
  'ol,ul': {
    'list-style': 'none',
  },
  'caption,th': {
    ta: 'left',
  },
  'h1,h2,h3,h4,h5,h6': {
    fw: 'normal',
    fz: '100%',
  },
  'q:before,q:after': {
    con: '""',
  },
  'abbr,acronym': {
    bd: 0,
  },
}
```
