import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ViewportScrollSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Sensors/ViewportScrollSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'SizeSensor'}))
  .add('Example', () =>
    <div>
      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />

      <ViewportScrollSensor>{(state) =>
        <pre>{JSON.stringify(state, null, 4)}</pre>
      }</ViewportScrollSensor>

      <div style={{
        width: 300,
        height: 1e3,
        border: '1px solid tomato'
      }} />
    </div>
  );
