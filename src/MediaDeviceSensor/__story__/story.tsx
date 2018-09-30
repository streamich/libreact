import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {MediaDeviceSensor, withMediaDevices} from '..';
import ShowDocs from '../../ShowDocs'

const Print = (props) => h('pre', {
  style: {fontFamily: 'monospace'}
},
  JSON.stringify(props, null, 4)
);

const PrintWithDevices = withMediaDevices(Print);

@withMediaDevices
class Printer extends Component<any, any> {
  render () {
    return h('pre', {
      style: {fontFamily: 'monospace'}
    },
      JSON.stringify(this.props, null, 4)
    );
  }
}

storiesOf('Sensors/MediaDeviceSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/MediaDeviceSensor.md')}))
  .add('FaCC', () =>
    <div>
      <MediaDeviceSensor>{(state) =>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      }</MediaDeviceSensor>
    </div>
  )
  .add('Render prop', () =>
    <div>
      <MediaDeviceSensor render={(state) =>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      } />
    </div>
  )
  .add('HOC', () => <PrintWithDevices />)
  .add('Decorator', () => <Printer />);
