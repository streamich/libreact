import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Battery} from '.';

storiesOf('Battery', module)
  .add('basic', () =>
    h(Battery, {}, (state) =>
      h('pre', {style: {
        fontFamily: 'monospace'
      }},
        JSON.stringify(state, null, 4)
      )
    )
  );
