import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {ViewportSensor, withViewport} from '..';
import ShowDocs from '../../ShowDocs'
import StoryViewportSensorBasicJsx from './StoryViewportSensorBasicJsx';
import StoryViewportSensorBasic from '../../ViewportObserverSensor/__story__/StoryViewportSensorBasic';
import StoryViewportSensorHorizontal from '../../ViewportObserverSensor/__story__/StoryViewportSensorHorizontal';
import StoryViewportSensorConf from '../../ViewportObserverSensor/__story__/StoryViewportSensorConf';

const Print = (props) => h('pre', {
  style: {fontFamily: 'monospace'}
}, JSON.stringify(props, null, 4));

const Hoc1 = withViewport(Print, '', {
  threshold: 1
});

const Hoc2 = withViewport(Print, 'visible', {
  threshold: 1
});

@withViewport
class Decorator1 extends Component<any, any> {
  render () {
    return h(Print, this.props);
  }
}

@withViewport('', {threshold: 1})
class Decorator2 extends Component<any, any> {
  render () {
    return h(Print, this.props);
  }
}

@withViewport('visible', {threshold: 1})
class Decorator3 extends Component<any, any> {
  render () {
    return h(Print, this.props);
  }
}

storiesOf('Sensors/ViewportSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ViewportSensor.md')}))
  .add('Basic example', () =>
    <StoryViewportSensorBasic sensor={ViewportSensor} onChange={action('onChange')} />)
  .add('Horizontal', () =>
    <StoryViewportSensorHorizontal sensor={ViewportSensor} onChange={action('onChange')} />)
  .add('Threshold 0%', () =>
    <StoryViewportSensorConf threshold={0} sensor={ViewportSensor} onChange={action('onChange')} />)
  .add('Threshold 25%', () =>
    <StoryViewportSensorConf threshold={0.25} sensor={ViewportSensor} onChange={action('onChange')} />)
  .add('Threshold 75%', () =>
    <StoryViewportSensorConf threshold={0.75} sensor={ViewportSensor} onChange={action('onChange')} />)
  .add('Threshold 100%', () =>
    <StoryViewportSensorConf threshold={1} sensor={ViewportSensor} onChange={action('onChange')} />)
  .add('Threshold 100%, margin 100px', () =>
    <StoryViewportSensorConf threshold={1} margin={[100, 100, 100, 100]} sensor={ViewportSensor} onChange={action('onChange')} />)
  .add('HOC 1', () =>
    <StoryViewportSensorBasicJsx>
      <Hoc1 />
    </StoryViewportSensorBasicJsx>
  )
  .add('HOC 2', () =>
    <StoryViewportSensorBasicJsx>
      <Hoc2 />
    </StoryViewportSensorBasicJsx>
  )
  .add('Decorator 1', () =>
    <StoryViewportSensorBasicJsx>
      <Decorator1 />
    </StoryViewportSensorBasicJsx>
  )
  .add('Decorator 2', () =>
    <StoryViewportSensorBasicJsx>
      <Decorator2 />
    </StoryViewportSensorBasicJsx>
  )
  .add('Decorator 3', () =>
    <StoryViewportSensorBasicJsx>
      <Decorator3 />
    </StoryViewportSensorBasicJsx>
  );
