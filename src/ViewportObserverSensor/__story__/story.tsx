import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ViewportObserverSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import StoryViewportSensorBasic from './StoryViewportSensorBasic';
import StoryViewportSensorHorizontal from './StoryViewportSensorHorizontal';
import StoryViewportSensorConf from './StoryViewportSensorConf';

storiesOf('Sensors/ViewportSensor/ViewportObserverSensor', module)
  .add('Basic example', () =>
    <StoryViewportSensorBasic sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Horizontal', () =>
    <StoryViewportSensorHorizontal sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 0%', () =>
    <StoryViewportSensorConf threshold={0} sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 25%', () =>
    <StoryViewportSensorConf threshold={0.25} sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 75%', () =>
    <StoryViewportSensorConf threshold={0.75} sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 100%', () =>
    <StoryViewportSensorConf threshold={1} sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 100%, margin 100px', () =>
    <StoryViewportSensorConf threshold={1} margin={[100, 100, 100, -100]} sensor={ViewportObserverSensor} onChange={action('onChange')} />);
