# `styled()()` Component Interface

`styled` component syntax allows you to "attach" styles to some HTML element or React component. It is a [HOC](../Introduction.md#hoc) generator,
that creates a HOC that receives a CSS-like object and returns a component that that will be styled accordingly.

# Usage

Import `styled()()` function.

```js
import {styled} from 'libreact/lib/css';
```

Now create a styled `<Border>` component.

```jsx
const Border = styled('div')({
  border: '1px solid tomato',
  bdrad: '3px'
});

<Border>Hello world!</Border>
```

"Styled" component's styles can be a function that returns a CSS-like object. This function receives components props as an argument.

```jsx
const Border = styled.div(({color = 'tomato'}) => ({
  border: '1px solid ' + color,
  bdrad: '3px'
}));
```
