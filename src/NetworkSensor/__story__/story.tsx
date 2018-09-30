import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {NetworkSensor, withNetwork} from '..';
import ShowDocs from '../../ShowDocs'

const Status = (props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>;

const NetworkStatus1 = withNetwork(Status);
const NetworkStatus2 = withNetwork(Status, 'network');
const NetworkStatus3 = withNetwork(Status, '');

@withNetwork
class NetworkStatus4 extends Component<any, any> {
  render () {
    return (
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(this.props, null, 4)}
      </pre>
    );
  }
}

@withNetwork('network')
class NetworkStatus5 extends Component<any, any> {
  render () {
    return (
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(this.props, null, 4)}
      </pre>
    );
  }
}

@withNetwork('')
class NetworkStatus6 extends Component<any, any> {
  render () {
    return (
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(this.props, null, 4)}
      </pre>
    );
  }
}

storiesOf('Sensors/NetworkSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/NetworkSensor.md')}))
  .add('FaCC', () =>
    h(NetworkSensor, {}, (state) =>
      h('pre', {style: {
        fontFamily: 'monospace'
      }},
        JSON.stringify(state, null, 4)
      )
    )
  )
  .add('Render prop', () =>
    h(NetworkSensor, {
      render: (state) =>
        h('pre', {style: {
          fontFamily: 'monospace'
        }},
          JSON.stringify(state, null, 4)
        )
    })
  )
  .add('HOC 1', () => h(NetworkStatus1))
  .add('HOC 2', () => h(NetworkStatus2))
  .add('HOC 3', () => h(NetworkStatus3))
  .add('Decorator 1', () => h(NetworkStatus4))
  .add('Decorator 2', () => h(NetworkStatus5))
  .add('Decorator 3', () => h(NetworkStatus6));
