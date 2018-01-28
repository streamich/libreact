import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {MouseSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Sensors/MouseSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'MouseSensor'}))
  .add('Example', () =>
    <MouseSensor>{(state) =>
      <div style={{
        width: 300,
        height: 300,
        border: '1px solid tomato',
        margin: '100px'
      }}>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      </div>
    }</MouseSensor>
  );
