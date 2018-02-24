# `@css()` Decorator Interface

Allows you to style your stateful React components using a `@css()` class and `.render()` method decorators.
`@css` accepts a CSS-like object or a function that returns a CSS-like object as a single argument.

If function is provided as a parameters, it will receive a single argument: instance object of the component.

Class decorator styles will not update when your component re-renders, use `.render()` method decorator
if you want your CSS to update every time your component re-renders.

## Usage

Import `@css` decorator.

```js
import {css} from 'libreact/lib/css';
```

Add styling to your component using CSS-like object.

```jsx
@css({
  border: '1px solid tomato'
})
class App extends Component {

  @css(({props}) => ({
    color: props.color
  }))
  render () {
    return <div>Hello world!</div>;
  }
}
```
