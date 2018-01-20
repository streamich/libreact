import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {NetworkSensor} from '.';

storiesOf('NetworkSensor', module)
  .add('basic', () =>
    h(NetworkSensor, {}, (state) =>
      h('pre', {style: {
        fontFamily: 'monospace'
      }},
        JSON.stringify(state, null, 4)
      )
    )
  );
