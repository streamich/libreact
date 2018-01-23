# Route

Routing components allow you to create implement single page app routing functionality.

Contents:

  - [`<Router>`](#router)
  - [`<Route>`](#route)
  - [`go()`](#go)
  - [`withRoute()`](#withroute)


## `<Router>`

`Router` is a root component that provides routing to your application. I should be placed above all other components
that use routing. It uses React's context [`Provider`](./context.md#provider) component to provide route information to
its children.

### Props

  - `route` - optional, string, route to use for routing. If not specified, `<Router>` will use
  [`<LocationSensor>`](./LocationSensor.md) internally to track any changes to `window.location`.
  - `ns` - optional, string, namespaces of the router. This allows you to have many different routers
  on one page, each in a separate namespace.

Unlike other routing libraries `<Router>` component lets you specify the current route manually using the `route` property,
this way you can use Redux or MobX, or any other state container library to store your route, if you want to.


## `<Route>`

`Route` tries to match a fragment in a route. If it does match, the contents of the route is rendered. The contents of the route
can be either regular JSX children or a FaCC or a React component specified in the `comp` prop.


### Props

  - `match`, optional, matching condition, defaults to `/.+/`, see discussion below.

The props object has the following TypeScript signature

```ts
interface IRouteMatch {
  children?: React.ReactElement<any> | ((params) => React.ReactElement<any>);
  cnt?: number;
  comp?: React.ComponentClass<{}> | React.StatelessComponent<{}>;
  exact?: boolean;
  match?: TRouteMatcher | RegExp | string;
  ns?: string;
  preserve?: boolean;
}
```


As you can see the `match` prop has the following signature

```ts
TRouteMatcher | RegExp | string;
```

where

```ts
type TRouteMatcher = (route: string) => TRouteMatchResult;

interface TRouteMatchResult {
  length: number; // Length how many characters to truncate from route.
  matches?: RegExpMatchArray; // RegExp matches, if any.
}
```

  - if `string`, it is converted to a regular expression with `^` prepended, which means it has to match the route starting from
  the very first character. For example, `/users` -> `/^(\/users)/`. If the `exact` prop is on, also `$` appended to the regular
  expression, which means the regular expression has to match the route exactly. For example, `/users` -> `/^(\/users)$`.
  - if `RegExp`, the specified regular expression will be used to match the current `route`, the resulting matches array will be
  returned, if any.
  - if `function` is provided, it will be treated as if it has type of `TRouteMatcher`, it is given a `route` string as a
  single argument. If it does not match the route, it has to return `null`. If it matches the `route`, it has to return an object
  with the following properties:
     - `length` - required, number of characters to truncate from the start of the route, for the inner routes, basically this should be
     equal to the length of the matched fragment of the path.
     - `matches` - optionsl, array of matches returned by `String.prototype.match()` function.


## Example

### With Redux

```jsx
import {Router, Route} from 'libreact/lib/route';
import {connect} from 'react-redux';

const App = ({route}) =>
  <Router route={route}>
    <div>
      <Route match='/home' comp={Home} />
      <Route match='/users' comp={Users} />
    </div>
  </Router>;

const mapStateToProps = ({route}) => ({
  route
});

export default connect(mapStateToProps)(App);
```
