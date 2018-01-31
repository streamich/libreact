import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {LocalStorage} from '..';
import StoryLocalStorageForm from './StoryLocalStorageForm';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Generators/LocalStorage', module)
  .add('Documentation', () => h(ShowDocs, {name: 'LocalStorage'}))
  .add('Basic example', () =>
    <div>
      <LocalStorage name='foo' data='bar' />
      <pre style={{fontFamily: 'monospace'}}>
        {`<LocalStorage name='foo' value='bar' />`}
      </pre>
    </div>
  )
  .add('Using persist', () =>
    <div>
      <LocalStorage name='foo2' data='bar2' persist />
      <pre style={{fontFamily: 'monospace'}}>
        {`<LocalStorage name='foo2' value='bar2' persist />`}
      </pre>
    </div>
  )
  .add('Form example', () => <StoryLocalStorageForm />);
