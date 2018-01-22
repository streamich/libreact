import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetMinimalistic3 from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetMinimalistic3', module)
  .add('Documentation', () => h(ShowDocs, {name: 'reset/CssResetMinimalistic3'}))
  .add('Example', () =>
    h(CssResetMinimalistic3)
  );
