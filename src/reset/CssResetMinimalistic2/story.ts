import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetMinimalistic2 from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetMinimalistic2', module)
  .add('Documentation', () => h(ShowDocs, {name: 'reset/CssResetMinimalistic2'}))
  .add('Example', () =>
    h(CssResetMinimalistic2)
  );
