# Inversion

> __*inversion*__
>
> the action of inverting something or the state of being inverted.

Inversion is a technique where one injects state and/or life-cycle methods into render-prop/FaCC.

This effectively allows you to have

  1. State
  2. Life-cycle methods
  3. Refs to DOM elements
  4. Other objects

in JSX tree without having to write stateful React components.

  - [`invert()`](./invert.md) and [`<Inverted>`](./invert.md#inverted) - inverts DOM element `ref`.
  - [`<State>`](./State.md) - inverts state and `.setState()` method.
     - [`<Toggle>`](./Toggle.md), [`<Flipflop>`](./Flipflop.md), [`<Value>`](./Value.md), [`<Couter>`](./Counter.md), [`<List>`](./List.md), and [`<Map>`](./Map.md)


## Example

A basic example, `cnt` is incremented by 1 on each click:

```jsx
<State init={{cnt: 0}}>
  {({cnt}, set) =>
    <div onClick={() => set({cnt: cnt + 1})}>
      {cnt}
    </div>
  }
<State>
```
