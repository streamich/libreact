import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {ScratchSensor} from '..';
import ShowDocs from '../../ShowDocs';

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
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ScratchSensor.md')}))
  .add('FaCC', () => <ScratchSensor>{Demo}</ScratchSensor>)
  .add('With animation', () => <ScratchSensor>{
    (state) => {
      return (
        <div style={{
          width: 300,
          height: 300,
          border: '1px solid tomato',
          margin: '100px',
          position: 'relative',
        }}>
          <pre style={{fontFamily: 'monospace'}}>
            {JSON.stringify(state, null, 4)}
          </pre>
          <div style={{
            position: 'absolute',
            top: Math.min(state.y, state.y + state.dy),
            left: Math.min(state.x, state.x + state.dx),
            width: Math.abs(state.dx),
            height: Math.abs(state.dy),
            border: '1px solid tomato',
          }} />
        </div>
      );
    }}</ScratchSensor>
  )
  .add('Fires events', () => <ScratchSensor
    render={Demo}
    onScratchStart={action('onScratchStart')}
    onScratch={action('onScratch')}
    onScratchEnd={action('onScratchEnd')}
  />)
  .add('With bond', () => <ScratchSensor bond>{
    (state) => {
      return (
        <div style={{
          width: 300,
          height: 300,
          border: '1px solid tomato',
          margin: '100px',
          position: 'relative',
        }}>
          <pre style={{fontFamily: 'monospace'}}>
            {JSON.stringify(state, null, 4)}
          </pre>
          <div {...state.bond} style={{
            position: 'absolute',
            top: 200,
            left: 200,
            width: 50,
            height: 50,
            border: '1px solid tomato',
          }} />
        </div>
      );
    }}</ScratchSensor>
  )