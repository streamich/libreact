import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {ViewportScrollSensor} from '..';
import StoryViewportSensorBasic from '../../ViewportObserverSensor/__story__/StoryViewportSensorBasic';
import StoryViewportSensorHorizontal from '../../ViewportObserverSensor/__story__/StoryViewportSensorHorizontal';
import StoryViewportSensorConf from '../../ViewportObserverSensor/__story__/StoryViewportSensorConf';

storiesOf('Sensors/ViewportSensor/ViewportScrollSensor', module)
  .add('Basic example', () =>
    <StoryViewportSensorBasic sensor={ViewportScrollSensor} onChange={console.log} />)
  .add('Horizontal', () =>
    <StoryViewportSensorHorizontal sensor={ViewportScrollSensor} onChange={console.log} />)
  .add('Threshold 0%', () =>
    <StoryViewportSensorConf threshold={0} sensor={ViewportScrollSensor} onChange={console.log} />)
  .add('Threshold 25%', () =>
    <StoryViewportSensorConf threshold={0.25} sensor={ViewportScrollSensor} onChange={console.log} />)
  .add('Threshold 75%', () =>
    <StoryViewportSensorConf threshold={0.75} sensor={ViewportScrollSensor} onChange={console.log} />)
  .add('Threshold 100%', () =>
    <StoryViewportSensorConf threshold={1} sensor={ViewportScrollSensor} onChange={console.log} />)
  .add('Threshold 100%, margin 100px', () =>
    <StoryViewportSensorConf threshold={1} margin={[100, 100, 100, 100]} sensor={ViewportScrollSensor} onChange={action('onChange')} />);
