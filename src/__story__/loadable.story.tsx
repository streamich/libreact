import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {loadable} from '../loadable';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Dummies/loadable()', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../docs/en/loadable.md')}))
