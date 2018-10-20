import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {TouchSupportSensor} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Sensors/TouchSupportSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/TouchSupportSensor.md')}))
  .add('Generic', () =>
    <TouchSupportSensor>{({touchSupported}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {touchSupported ? 'TOUCH SUPPORTED' : '...'}
      </div>
    }</TouchSupportSensor>
  )
  .add('Only render on touch devices', () =>
    <TouchSupportSensor onlyTouch>{({touchSupported}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {touchSupported ? 'TOUCH SUPPORTED' : '...'}
        <div style={{
          background: 'tomato',
          color: 'white',
          padding: 30
        }}>
          You won't see this on your desktop computer!
        </div>
      </div>
    }</TouchSupportSensor>
  )
  .add('Only render on non-touch devices', () =>
    <TouchSupportSensor onlyMouse>{({touchSupported}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {touchSupported ? '...' : 'TOUCH NOT SUPPORTED'}
        <div style={{
          background: 'tomato',
          color: 'white',
          padding: 30
        }}>
          You won't see this on your touch screen devices!
        </div>
      </div>
    }</TouchSupportSensor>
  )
