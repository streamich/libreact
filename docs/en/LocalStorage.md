# `<LocalStorage>`

Uses [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API to persist value in local storage.

## Usage

```jsx
import {LocalStorage} from 'libreact/lib/LocalStorage';

<LocalStorage name='foo' data='bar' />
<LocalStorage name='foo2' data='baz' persist />
<LocalStorage name='foo3' data='bazooka' persist onMount={data => {/* ... */}} />
```

## Props

  - `name` - key name on `localStorage` object.
  - `data` - data to store, can be a plain JavaScript object.
  - `persist` - optional boolean, that indicates whether to leave the value in `localStorage` when
  your component unmounts. By defaults the stored local storage value is removed once the coponent is
  un-mounted, set it to `true` to leave the value on un-mount.
  - `debounce` - optional, time in milliseconds how often to persist to `localStorage` on re-renders, this
  value can be set only once on initial render.
  - `onMount` - optional, callback that receives stored data on component mount. Useful to persist and
  re-hydrate form data, for example.

## Example

In the below example form inputs are stored in `localStorage` and re-hydrated when user
comes back and form renders for the first time.

```jsx
<form>
  <input
    value={this.state.name}
    placeholder='Name'
    onChange={(e) => this.setState({name: e.target.value})}
  />
  <input
    value={this.state.email}
    placeholder='E-mail'
    onChange={(e) => this.setState({email: e.target.value})}
  />
  <LocalStorage
    name='form'
    data={this.state}
    persist
    onMount={(state) => this.setState(state)}
  />
</form>
```
