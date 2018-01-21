import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetShaunInman from '.';

storiesOf('reset', module)
  .add('CssResetShaunInman', () =>
    h(CssResetShaunInman)
  );
