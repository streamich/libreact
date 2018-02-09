# Inversion

> __*inversion*__
>
> the action of inverting something or the state of being inverted.

Inversion is a technique where one injects state and/or life-cycle methods into a render prop.

This effectively allows you to have

  1. State
  2. Life-cycle methods
  3. Refs to DOM elements
  4. Other objects

in JSX tree without having to write stateful React components.

  - [`invert()`](./invert.md) and [`<Inverted>`](./invert.md#inverted) &mdash; inverts DOM element `ref`.
  - [`<State>`](./State.md) &mdash; inverts `.state` and `.setState()` method.
     - [`<Toggle>`](./Toggle.md), [`<Flipflop>`](./Flipflop.md), [`<Value>`](./Value.md), [`<Counter>`](./Counter.md), [`<List>`](./List.md), and [`<Map>`](./Map.md)


## Example

A basic example, `cnt` is incremented by 1 on each click

```jsx
<State init={{cnt: 0}}>
  {({cnt}, set) =>
    <div onClick={() => set({cnt: cnt + 1})}>
      {cnt}
    </div>
  }
<State>
```

or the same using `<Counter>` component

```jsx
<Counter>{({value, inc}) =>
  <div onClick={inc}>
    {value}
  </div>
}</Counter>
```
