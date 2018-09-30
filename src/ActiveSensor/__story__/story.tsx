import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {ActiveSensor} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Sensors/ActiveSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ActiveSensor.md')}))
  .add('Without bond', () =>
    <ActiveSensor>{({isActive}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {isActive ? 'ACTIVE' : '...'}
      </div>
    }</ActiveSensor>
  )
  .add('With bond', () =>
    <ActiveSensor bond>{({isActive, bond}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {isActive ? 'ACTIVE' : '...'}
        <div {...bond} style={{
          background: 'tomato',
          color: 'white',
          padding: 30
        }}>
          Click me!
        </div>
      </div>
    }</ActiveSensor>
  )
  .add('With custom bond', () =>
    <ActiveSensor bond='binding'>{({isActive, binding}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {isActive ? 'ACTIVE' : '...'}
        <div {...binding} style={{
          background: 'tomato',
          color: 'white',
          padding: 30
        }}>
          Click me!
        </div>
      </div>
    }</ActiveSensor>
  )
