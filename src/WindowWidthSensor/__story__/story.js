import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {WindowWidthSensor} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Sensors/WindowWidthSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/WindowWidthSensor.md')}))
  .add('Example', () =>
    h(WindowWidthSensor, {onWidth: action('onWidth')}, ({width, height}) =>
      h('div', {},
        `WIDTH: ${width}, HEIGHT: ${height}`
      )
    )
  )
  .add('No children', () =>
    h(WindowWidthSensor, {onWidth: action('onWidth')})
  )
