import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetUniversal from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetUniversal', module)
  .add('Documentation', () => h(ShowDocs, {name: 'reset/CssResetUniversal'}))
  .add('Examples', () =>
    h(CssResetUniversal)
  );
