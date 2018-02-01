import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetMinimalistic from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetMinimalistic', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/reset/CssResetMinimalistic.md')}))
  .add('Example', () =>
    h(CssResetMinimalistic)
  );
