# Routing

Routing components that allow you to implement single page app routing functionality.

  - Provides *dynamic* routing
  - Use [any state container](#use-any-state-container)
  - [Multiple routers](#multiple-routers) on one page

Reference:

  - [`<Router>`](#router)
  - [`<Route>`](#route)
  - [`<Switch>`](#switch)
  - [`<Match>`](#match)
  - [`<Link>`](#link)
  - [`go()`](#go)
  - [`createRouter()`](#createrouter)


## Usage

```js
import {Router, Match, Route, Switch, go, Link, createRouter} from 'libreact/lib/route';
```


## Use any state container

With libreact's `<Router>` you can choose to store the current route in your state continer (like Redux or MobX).
The "problem-of-all-routers" is that they all want to keep the state of the route. For example, [`react-router`](https://reacttraining.com/react-router/) uses
its internal history objects to store route information, and [it does not give you good access to that data structure](http://formidable.com/blog/2016/07/11/let-the-url-do-the-talking-part-1-the-pain-of-react-router-in-redux/).

So, if you wanted to store the state of the route in Redux, there was no good way for you to do that using `react-router`, that is why
[`redux-little-router`](https://github.com/FormidableLabs/redux-little-router) was born, however, `redux-little-router` itself hoards the
state of the route in Redux, so you cannot use it if you use any other state container, say MobX.

Libreact is completely orthogonal to where you store the *current route*, all you have to do is provide the current route to the `<Router>`
component using the `route` prop.

```jsx
<Router route={currentRoute}>
  {/* ... */}
</Router>
```

You can store it in Redux or MobX, or really anywhere you want. And if you don't want to bother, don't! Just use the current location of the browser:

```jsx
<LocationSensor>{({pathname}) =>
  <Router route={pathname}>
    {/* ... */}
  </Router>
}</LocationSensor>
```


## Multiple routers

You can have many routers operating on the same page in parallel. All you have to do is specify a *namespace* using the `ns` prop.

```jsx
<Router ns='secret'>
  <Route ns='secret' />
</Router>
```

Or use [`createRouter()`](#createrouter) to create React components with bound namespace.


## Reference

### `<Router>`

`Router` is a root component that provides routing to your application. It should be placed above all other components
that use routing. It uses React's context [`Provider`](./context.md#provider) component to provide route information to
its children.

#### Props

  - `route` &mdash; required, string, route to use for routing. If not specified, `<Router>` will use
  - `ns` &mdash; optional, string, namespaces of the router. This allows you to have many different routers
  on one page, each in a separate namespace.

Unlike in other routing libraries `<Router>` component forces you specify the current route manually using the `route` property,
this way you can use Redux or MobX, or any other state container library to store your route.


### `<Route>`

`Route` tries to match a fragment in a route. If it does match, the contents of the route is rendered. The contents of the route
can be either regular JSX children or a FaCC, render prop, or component prop.


#### Props

  - `match` &mdash; optional, matching condition, defaults to empty string. This can be a regular expression.
  - `exact` &mdash; optiona, boolean, whether string route has to match exactly.
  - `truncate` &mdash; optiona, boolean, whether matched part of the route should be truncated for the nested routes.
  - `ns` &mdash; optional, string, namespace of the router.


`match` prop can be a string, `RegExp` of a `Function`.

  - if `string`, it is converted to a regular expression with `^` prepended, which means it has to match the route starting from
  the very first character. For example, `/users` -> `/^(\/users)/`. If the `exact` prop is on, also `$` appended to the regular
  expression, which means the regular expression has to match the route exactly. For example, `/users` -> `/^(\/users)$`.
  - if `RegExp`, the specified regular expression will be used to match the current `route`, the resulting matches array will be
  returned, if any.
  - if `Function` is provided, it has to return an array of strings on a match.


### `<Match>`

`<Match>` component is similar to `<Route>`, but it always renders its children, regarles if route was actually matched.


### `go()`

Utility function that changes the current browser location. Has the following signature:

```ts
go: (url: string, params?: IGoParams) => void;

interface IGoParams {
  replace?: boolean;
  title?: string;
  state?: any;
}
```

  - `url` - required, string, URL where to navigate the browser. Usually you want to use a relative route with leading slash, like `/users`.
  - `replace` - whether to to use [`.replaceState()`](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method)
  rather than default [`.pushState()`](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method) when invoking History API.
  - `title` - title to specify in `.pushState()` or `.replaceState()` methods.
  - `state` - any serializable JavaScript object to store with the current history state. Useful, for example, to store current scroll position.


### `<Link>`

Renders a link that will change browser location on click.


### `createRouter()`

Create a new collection of router components given a namespace.

```js
const {Router, Route, Match} = createRouter('inner-router', go);
```
