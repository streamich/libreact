import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {LightSensor, withLight} from '..';
import ShowDocs from '../../ShowDocs'

const Print = (props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>;

const PrintWithLight = withLight(Print);

@withLight
class LightPrinter extends Component<any, any> {
  render () {
    return Print(this.props);
  }
}

storiesOf('Sensors/LightSensor', module)
  .add('Documentation', () => <ShowDocs {...{md: require('../../../docs/en/LightSensor.md')}} />)
  .add('FaCC', () =>
    <LightSensor>{(light) =>
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(light, null, 4)}
      </pre>
    }</LightSensor>
  )
  .add('Render prop', () =>
    <LightSensor render={(light) =>
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(light, null, 4)}
      </pre>
    } />
  )
  .add('HOC', () => <PrintWithLight />)
  .add('Decorator', () => <LightPrinter />);
