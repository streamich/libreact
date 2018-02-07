import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ElectronOnly} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Boundaries/ElectronOnly', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ElectronOnly.md')}))
  .add('Basic example', () =>
    <ElectronOnly>
      <div>
        This should be visible only in Electron app.
      </div>
    </ElectronOnly>
  );
