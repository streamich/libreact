import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {WindowScrollSensor} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Sensors/WindowScrollSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/WindowScrollSensor.md')}))
  .add('Example', () =>
    h('div', {style: {
      background: 'linear-gradient(to bottom, #fff 0%, #000 100%)',
      width: 5000,
      height: 5000
    }},
      h(WindowScrollSensor, {}, ({x, y}) =>
        h('div', {
          style: {
            border: '1px solid red',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%'
          }
        },
          `x: ${x}, y: ${y}`
        )
      )
    )
  )
  .add('No children', () =>
    h('div', {style: {
      background: 'linear-gradient(to bottom, #fff 0%, #000 100%)',
      width: 5000,
      height: 5000
    }},
      h(WindowScrollSensor, {
        onChange: action('onChange')
      })
    )
  )
