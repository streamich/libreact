import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {LocalStorage} from '.';

storiesOf('LocalStorage', module)
  .add('basic', () =>
    <div>
      <LocalStorage name='foo' data='bar' />
      <pre style={{fontFamily: 'monospace'}}>
        {`<LocalStorage name='foo' value='bar' />`}
      </pre>
    </div>
  )
  .add('persist', () =>
    <div>
      <LocalStorage name='foo2' data='bar2' persist />
      <pre style={{fontFamily: 'monospace'}}>
        {`<LocalStorage name='foo2' value='bar2' persist />`}
      </pre>
    </div>
  );
