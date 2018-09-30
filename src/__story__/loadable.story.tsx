import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import ShowDocs from '../ShowDocs'

storiesOf('Dummies/loadable()', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../docs/en/loadable.md')}))
