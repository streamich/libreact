import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Form} from '..';
import ShowDocs from '../../ShowDocs';

storiesOf('Inversion/Form', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Form.md')}))
  .add('Example', () =>
    <Form
      init={{
        email: '',
        remember: false
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({field, submit, reset}) => (
        <form onSubmit={submit}>
          <input type="email" placeholder="Email" {...field('email')} />
          <label>
            <input type="checkbox" {...field('remember')} />
            Remember me
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={reset}>Reset</button>
        </form>
      )}
    </Form>
  );
