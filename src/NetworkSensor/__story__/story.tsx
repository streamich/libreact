import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {NetworkSensor, withNetwork} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

const NetworkStatus = withNetwork((props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>
);

@withNetwork
class NetworkStatus2 extends Component<any, any> {
  render () {
    return (
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(this.props, null, 4)}
      </pre>
    );
  }
}

storiesOf('Sensors/NetworkSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'NetworkSensor'}))
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
  .add('HOC', () => h(NetworkStatus))
  .add('Decorator', () => h(NetworkStatus2));
