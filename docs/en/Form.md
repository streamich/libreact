# `<Form>`

Keeps form values in state and exposes helpers for binding fields, submitting,
and resetting the form.

`Form` is intentionally a lightweight state helper. It does not include schema
validation, async submission state, or a field registry.

## Usage

```jsx
import {Form} from 'libreact/lib/Form';

<Form
  init={{email: '', remember: false}}
  onSubmit={(values) => console.log(values)}
>
  {({field, submit, reset}) =>
    <form onSubmit={submit}>
      <input type="email" {...field('email')} />
      <label>
        <input type="checkbox" {...field('remember')} />
        Remember me
      </label>
      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  }
</Form>
```

## Props

Signature

```ts
interface IFormProps {
  init?: {[key: string]: any};
  onChange?: (values, name, value) => void;
  onSubmit?: (values, event?) => void;
  onReset?: (values) => void;
}
```

, where

  - `init` - optional map of initial field values.
  - `onChange` - optional callback fired after a field changes.
  - `onSubmit` - optional callback fired by `submit()`.
  - `onReset` - optional callback fired after values are reset.

## Render props

`<Form>` passes the following helpers to `children` or `render`:

  - `values` - current form values.
  - `get(name?)` - returns a single field value, or all values when called
    without a field name.
  - `set(name, value)` - sets a field value.
  - `field(name)` - returns `{name, value, checked, onChange}` props for an
    input-like control.
  - `submit(event?)` - prevents the default event and calls `onSubmit`.
  - `reset()` - restores values from `init`.


## `withForm()` HOC

HOC that merges `form` prop into enhanced component's props.

```jsx
import {withForm} from 'libreact/lib/Form';

const MyCompWithForm = withForm(MyComp);
```

You can overwrite the injected prop name:

```js
const MyCompWithForm = withForm(MyComp, 'myForm');
```

Set initial values:

```js
const MyCompWithForm = withForm(MyComp, 'form', {email: ''});
```
