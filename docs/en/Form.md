# `<Form>` and `<Field>`

Render-prop form state management, similar in spirit to [formik](https://github.com/jaredpalmer/formik) and [react-final-form](https://github.com/final-form/react-final-form). `<Form>` tracks values, errors, touched state, and the submission lifecycle. `<Field>` wires individual inputs into the surrounding form through context.

## Usage

```jsx
import {Form, Field} from 'libreact/lib/Form';

const required = (value) => (value ? undefined : 'required');

<Form
  init={{email: ''}}
  onSubmit={(values) => console.log('submitted', values)}
>
  {(form) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.submit();
      }}
    >
      <Field name="email" validate={required}>
        {({input, meta}) => (
          <div>
            <input {...input} type="email" placeholder="Email"/>
            {meta.touched && meta.error ? <span>{meta.error}</span> : null}
          </div>
        )}
      </Field>
      <button type="submit" disabled={form.submitting}>Submit</button>
    </form>
  )}
</Form>
```

## `<Form>` props

- `init` — initial field values object.
- `validate` — optional form-level validator `(values) => errors`, merged over field-level errors.
- `onSubmit` — called with `(values, form)` when submission passes validation; may return a promise, which keeps `submitting` true until it settles.

## Form render props

- `values`, `errors`, `touched` — current form state objects.
- `submitting` — true while `onSubmit` is in flight.
- `submitCount` — number of attempted submissions.
- `setValue(name, value)`, `setTouched(name)`, `setError(name, error)` — imperative state setters.
- `validate()` — run all validators now, returns the errors object.
- `submit()` — validate, and if clean, call `onSubmit`.
- `reset()` — restore `init` values and clear errors and touched.
- `field(name)` — input props `{name, value, onChange, onBlur}` for wiring an input manually.

## `<Field>` props

- `name` — field key in the form values object.
- `validate` — optional field-level validator `(value, values) => errorMessage | undefined`.

## Field render props

- `input` — spread onto the input element: `{name, value, onChange, onBlur}`.
- `meta` — `{error, touched}` for displaying validation feedback.
