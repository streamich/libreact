import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {BatterySensor} from '.';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Sensors/BatterySensor', module)
  .add('docs', () => h(ShowDocs, {name: 'BatterySensor'}))
  .add('basic', () =>
    h(BatterySensor, {}, (state) =>
      h('pre', {style: {
        fontFamily: 'monospace'
      }},
        JSON.stringify(state, null, 4)
      )
    )
  );
