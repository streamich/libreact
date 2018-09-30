import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {BatterySensor, withBattery} from '..';
import ShowDocs from '../../ShowDocs';

const Print = (props) => h('pre', {
  style: {
    fontFamily: 'monospace'
  }
},
  JSON.stringify(props, null, 4)
);

const PrintBattery = withBattery(Print, 'overwritten');

@withBattery
class Printer extends Component<any, any> {
  render () {
    return h('pre', {
      style: {
        fontFamily: 'monospace'
      }
    },
      JSON.stringify(this.props, null, 4)
    );
  }
}

storiesOf('Sensors/BatterySensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/BatterySensor.md')}))
  .add('FaCC', () =>
    h(BatterySensor, {}, (state) =>
      h('pre', {style: {
        fontFamily: 'monospace'
      }},
        JSON.stringify(state, null, 4)
      )
    )
  )
  .add('Render prop', () =>
    h(BatterySensor, {
      render: (state) =>
      h('pre', {style: {
        fontFamily: 'monospace'
      }},
        JSON.stringify(state, null, 4)
      )
    })
  )
  .add('HOC', () => h(PrintBattery))
  .add('Decorator', () => h(Printer));
