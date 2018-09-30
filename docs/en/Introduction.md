# Introduction

`libreact` is a collection of most essential React utilities you will probably need in any project.

[Render prop](#render-props) and [FaCC](#facc) notation is used interchangeably as most `libreact`
components support both interfaces and implement [*Universal Component Interface*](https://github.com/streamich/react-universal-interface).
Also, most render prop components support [component prop](#component-prop) interface, with the following precedence:

  1. FaCC
  2. Render prop
  3. Component prop


## Render props

*Render props* are components which have props that start with `render*` and accept a function that
returns a React element, for example:

```jsx
<App
  renderNavigation={() => <Navigation />}
  renderBody={() => <Body />}
  renderFooter={() => <Footer />}
/>
```

Where the function like `() => <Navigation />` *"renders"* the navigation.

Typically though a render prop component will have only one `render*` prop, in that case
we simply call it `render`.

```jsx
<MouseSensor render={({posX, posY}) => <div />} />
```


## FaCC

FaCC or *Function as a Child Component* is a special case of render prop where the single
render prop is called `children` instead.

```jsx
<MouseSensor children={({posX, posY}) => <div />} />
```

FaCC notation is superior to a single render prop notation, because you can put the rendering function into props, as
above, or place it as a child in JSX tree, which allows your *"HTML"* markup to have natural spacing.

```jsx
<MouseSensor>{({posX, posY}) =>
  <div />
}</MouseSensor>
```

FaCCs are especially convenient when you use hyperscript function `h` to create your
React elements, because you don't have to type the closing tag and create a props object unnecessarily.

```js
h(MouseSensor, null, ({posX, posY}) => h('div')})
```


## Component prop

*Component prop* is when a component expects a `component` or `comp` prop that
itself is a component.

```jsx
<Route match='/home' comp={Home} />
<Route match='/user' component={User} />
```

`libreact` supports both ways of component prop (`comp` and `component`). Normally, when a component has a
render prop interface it will also support the component prop interface.


## HOC

HOC or *Higher Order Component* is a function that receives AND/OR returns React components.


## Enhancer

*Enhancer* is a HOC that receives AND returns React components.
