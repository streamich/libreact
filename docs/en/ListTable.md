# `<ListTable>`

Wraps `children` into a table with specified column number.

## Usage

Below renders 2x3 table.

```jsx
import {ListTable} from 'libreact/lib/ListTable';

<ListTable cols={2}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</ListTable>
```


## Props

- `cols` &mdash; optional, number or columns table should have, defaults to `3`.
- `renderRow` &mdash; optional, function that receives an array of `<td>` cells as React
  elements and should return a `<tr>` React element, defaults to `cells => h('tr', null, ...cells)`.
