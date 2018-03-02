import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ScratchSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs';

const Demo = (props) =>
  <div style={{
    width: 300,
    height: 300,
    border: '1px solid tomato',
    margin: '100px'
  }}>
    <pre style={{fontFamily: 'monospace'}}>
      {JSON.stringify(props, null, 4)}
    </pre>
  </div>;

storiesOf('Sensors/ScratchSensor', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/MouseSensor.md')}))
  .add('FaCC', () => <ScratchSensor>{Demo}</ScratchSensor>)
