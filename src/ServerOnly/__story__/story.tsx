import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ServerOnly} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Boundaries/ServerOnly', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ServerOnly.md')}))
  .add('Basic example', () =>
    <ServerOnly>
      <div>
        This should be visible only in a browser.
      </div>
    </ServerOnly>
  );
