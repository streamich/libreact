import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetTantek from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetTantek', module)
  .add('Documentation', () => h(ShowDocs, {name: 'reset/CssResetTantek'}))
  .add('Example', () =>
    h(CssResetTantek)
  );
