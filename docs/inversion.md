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

in JSX without having to write stateful React components.

## Example

A counter example, `cnt` increments by 1 on each click:

```jsx
<State init={{cnt: 0}}>
  {({cnt}, set) =>
    <div onClick={() => set({cnt: cnt + 1})}>
      {cnt}
    </div>
  }
<State>
```
