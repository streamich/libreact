import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetPoorMan from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetPoorMan', module)
  .add('Documentation', () => h(ShowDocs, {name: 'reset/CssResetPoorMan'}))
  .add('Example', () =>
    h(CssResetPoorMan)
  );
