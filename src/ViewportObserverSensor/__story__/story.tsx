import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ViewportObserverSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import StoryViewportSensorBasic from './StoryViewportSensorBasic';
import StoryViewportSensorHorizontal from './StoryViewportSensorHorizontal';
import StoryViewportSensorThreshold from './StoryViewportSensorThreshold';

storiesOf('Sensors/ViewportObserverSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'ViewportObserverSensor'}))
  .add('Basic example', () =>
    <StoryViewportSensorBasic sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Horizontal', () =>
    <StoryViewportSensorHorizontal sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 0%', () =>
    <StoryViewportSensorThreshold threshold={0} sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 25%', () =>
    <StoryViewportSensorThreshold threshold={0.25} sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 75%', () =>
    <StoryViewportSensorThreshold threshold={0.75} sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Threshold 100%', () =>
    <StoryViewportSensorThreshold threshold={1} sensor={ViewportObserverSensor} onChange={action('onChange')} />);
