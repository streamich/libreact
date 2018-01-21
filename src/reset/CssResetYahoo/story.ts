import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import CssResetYahoo from '.';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('CSS resets/CssResetYahoo', module)
  .add('Documentation', () => h(ShowDocs, {name: 'reset/CssResetYahoo'}))
  .add('Examples', () =>
    h(CssResetYahoo)
  );
