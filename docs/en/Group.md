# `<Group>`

Inserts separators between its children.


## Usage

Import:

```jsx
import {Group} from 'libreact/lib/Group';
```

Default separator is a space `" "`.

```jsx
<Group>
  <span>Hello</span>
  <span>world</span>
</Group>
```

Result:

```html
<div>
  <span>Hello</span> <span>world</span>
</div>
```

Use custom separator.

```jsx
<Group separator={<hr />}>
  <span>Hello</span>
  <span>world</span>
</Group>
```

Use `as` prop to specify wrapper element tag name.

```jsx
<Group as="span">
  <span>Hello</span>
  <span>world</span>
</Group>
```

Pass through any props to the wrapper element.

```jsx
<Group className="foobar">
  <span>Hello</span>
  <span>world</span>
</Group>
```
