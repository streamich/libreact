import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {WindowSizeSensor} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Sensors/WindowSizeSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/WindowSizeSensor.md')}))
  .add('Example', () =>
    h(WindowSizeSensor, {}, ({width, height}) =>
      h('div', {},
        `WIDTH: ${width}, HEIGHT: ${height}`
      )
    )
  )
  .add('No children', () =>
    h(WindowSizeSensor, {onChange: action('onChange')})
  )
