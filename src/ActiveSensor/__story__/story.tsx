import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ActiveSensor, withActive} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Sensors/ActiveSensor', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ActiveSensor.md')}))
  .add('FaCC', () =>
    <ActiveSensor>{({isActive}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {isActive ? 'ACTIVE' : '...'}
      </div>
    }</ActiveSensor>
  )
