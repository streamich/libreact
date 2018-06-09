# `jsxstyle()` Interfaces

`jsxstyle` interface allows you to define CSS right inside your JSX nodes.

## Usage

Import the `jsxstyle()` function.

```js
import {jsxstyle} from 'libreact/lib/css';
```

Now create your "building blocks".

```js
const Button = jsxstyle('button', {
    bg: '#07f',
    col: '#fff',
    pad: '20px',
    mar: '5px',
    bd: 0
});
```

You can add extra styles to your building blocks.

```jsx
<Button>Foo</Button>
<Button borderRadius='3px'>Bar</Button>
<Button bdrad='10px' bg='red'>Baz</Button>
```
