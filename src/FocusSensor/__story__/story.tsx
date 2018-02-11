import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {FocusSensor, withFocus} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Sensors/FocusSensor', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/FocusSensor.md')}))
  .add('With bond', () =>
    <FocusSensor bond>{({isFocused, bond}) =>
      <div style={{
        border: '1px solid tomato',
        padding: 30
      }}>
        {isFocused ? 'Focused' : '...'}
        <input {...bond} />
      </div>
    }</FocusSensor>
  )
