import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetEricMeyerCondensed from '.';

storiesOf('reset', module)
  .add('CssResetEricMeyerCondensed', () =>
    h(CssResetEricMeyerCondensed)
  );
