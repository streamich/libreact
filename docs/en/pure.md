# `pure()`

An enhancer that makes component re-render only when its props change. Uses [`fast-shallow-equal`](https://github.com/streamich/fast-shallow-equal)
to do shallow prop comparison.


## Usage

```js
import {pure} from 'libreact/lib/pure';

const PureComp = pure(Comp);
```
