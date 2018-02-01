import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetSiolon from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetSiolon', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/reset/CssResetSiolon.md')}))
  .add('Example', () =>
    h(CssResetSiolon)
  );
