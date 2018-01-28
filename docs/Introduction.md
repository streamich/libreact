# Introduction

`libreact` is a collection of most essential React utilities you will probably need in any project.

[Render prop](#render-props) and [FaCC](#facc) notation is usually used interchangeably as most `libreact`
components support both interfaces.


## Render props

*Render props* are components which have props stat start with `render*` and accept a function that
returns a React element, for example:

```jsx
<App
  renderNavigation={() => <Navigation />}
  renderBody={() => <Body />}
  renderFooter={() => <Footer />}
/>
```

Where the function like `() => <Navigation />` *"render"s* the navigation.

Typically though a render prop component will have only one `render*` prop, in that case
we simply call it `render`.

```jsx
<MouseSensor render={({posX, posY}) => <div />} />
```


## FaCC

FaCC or *Function as a Child Component* is a special case or render prop where the single
render prop is called `children` instead.

```jsx
<MouseSensor children={({posX, posY}) => <div />} />
```

FaCC is superior to a single render prop notation, because you can put the rendering function into props, as
above, or place it as a child in JSX tree, which allows your *"HTML"* to have natural spacing.

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


## HOC

HOC or *Higher Order Component* is a function that receives AND/OR returns a React component.


## Enhancer

*Enhancer* is a HOC that receives AND returns a React component.
