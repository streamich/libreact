import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetPoorMan from '.';

storiesOf('CSS resets', module)
  .add('CssResetPoorMan', () =>
    h(CssResetPoorMan)
  );
