# `StyleSheet.create()` Interface

`StyleSheet.create()` interface is similar to to [`rule()`](./rule.md) interface, but instead of creating
a single "rule" you create a collection of rules for any logical unit you need in your component.

__Example__

```jsx
import {StyleSheet} from 'libreact/lib/css';

const styles = StyleSheet.create({
  container: {
    border: '1px solid tomato',
  }
  button: {
    background: 'red',
    borderRadius: '5px',
    color: '#fff',
  }
});

class App extends Component {
  render () {
    return (
      <div className={styles.container}>
        <button className={styles.button}/>
      </div>
    );
  }
}
```

This approach has a couple of advantages over the [`rule`](./rule.md) interface. Firstly, it returns
an object `styles` with `button` and `link` keys you specify that will each hold a string of class
names. Secondly, `StyleSheet` styles evaluate lazily &mdash; the CSS will not be inject into the page
when you create the `style` object. The actual CSS will be inserted into the page when you reference
a "style", like `styles.button` for the first time.
