import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {MouseSensor, withMouse} from '..';
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

const DemoWithBond = (props) =>
  <div style={{
    width: 300,
    height: 300,
    border: '1px solid tomato',
    margin: '100px'
  }} {...props.bond}>
    <pre style={{fontFamily: 'monospace'}}>
      {JSON.stringify(props, null, 4)}
    </pre>
  </div>;

const Hoc1 = withMouse(({mouse}) => h(DemoWithBond, mouse));
const Hoc2 = withMouse(({foo}) => h(DemoWithBond, {...foo, bond: foo.myBond}), 'foo', {bond: 'myBond'});

@withMouse
class Decorator extends Component<any, any> {
  render () {
    return <DemoWithBond {...this.props.mouse} />;
  }
}

storiesOf('Sensors/MouseSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/MouseSensor.md')}))
  .add('FaCC', () => <MouseSensor onMouseMove={action('onMouseMove')}>{Demo}</MouseSensor>)
  .add('FaCC with bond', () => <MouseSensor bond>{DemoWithBond}</MouseSensor>)
  .add('Render prop', () => <MouseSensor render={Demo} />)
  .add('HOC 1', () => <Hoc1 />)
  .add('HOC 2', () => <Hoc2 />)
  .add('Decorator', () => <Decorator />);
