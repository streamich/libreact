import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetEricMeyer from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetEricMeyer', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/reset/CssResetEricMeyer.md')}))
  .add('Example', () =>
    h(CssResetEricMeyer)
  );
