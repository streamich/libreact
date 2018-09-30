import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {ElectronOnly} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Boundaries/ElectronOnly', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ElectronOnly.md')}))
  .add('Basic example', () =>
    <ElectronOnly>
      <div>
        This should be visible only in Electron app.
      </div>
    </ElectronOnly>
  );
