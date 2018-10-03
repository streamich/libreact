import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {LocalStorage} from '..';
import StoryLocalStorageForm from './StoryLocalStorageForm';
import ShowDocs from '../../ShowDocs'

storiesOf('Side Effects/LocalStorage', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/LocalStorage.md')}))
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
