import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {LocationSensor, withLocation} from '..';
import ShowDocs from '../../ShowDocs'

const Print = (props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>;

const Facc = () =>
  <LocationSensor onChange={(state) => console.log('s', state)}>{(state) => <Print {...state} />}</LocationSensor>;

const RenderProp = () =>
  <LocationSensor render={(state) => <Print {...state} />} />;

const Hoc = withLocation(Print);

@withLocation
class Decorator extends Component<any, any> {
  render () {
    return <Print {...this.props} />;
  }
}

class StoryLocationSensorExample extends Component<any, any> {
  state = {
    url: 'page.html',
    state: 'STATE'
  };

  render () {
    return (
      <div>
        <input value={this.state.url} onChange={(e) => this.setState({url: e.target.value})} />
        <input value={this.state.state} onChange={(e) => this.setState({state: e.target.value})} />
        <button onClick={() => {
          history.pushState(this.state.state, '', this.state.url);
        }}>Push state</button>

        <br />

        <button onClick={() => history.go(-1)}>history.back()</button>
        <button onClick={() => history.go(1)}>history.forward()</button>

        <this.props.comp />
      </div>
    );
  }
}

storiesOf('Sensors/LocationSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/LocationSensor.md')}))
  .add('FaCC', () => <StoryLocationSensorExample comp={Facc} />)
  .add('Render prop', () => <StoryLocationSensorExample comp={RenderProp} />)
  .add('HOC', () => <StoryLocationSensorExample comp={Hoc} />)
  .add('Decorator', () => <StoryLocationSensorExample comp={Decorator} />);
