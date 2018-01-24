import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ViewportScrollSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import StoryViewportSensorBasic from '../../ViewportObserverSensor/__story__/StoryViewportSensorBasic';
import StoryViewportSensorHorizontal from '../../ViewportObserverSensor/__story__/StoryViewportSensorHorizontal';
import StoryViewportSensorThreshold from '../../ViewportObserverSensor/__story__/StoryViewportSensorThreshold';

storiesOf('Sensors/ViewportScrollSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'ViewportScrollSensor'}))
  .add('Basic example', () =>
    <StoryViewportSensorBasic sensor={ViewportScrollSensor} onChange={action('onChange')} />)
  .add('Horizontal', () =>
    <StoryViewportSensorHorizontal sensor={ViewportScrollSensor} onChange={action('onChange')} />)
  .add('Threshold 0%', () =>
    <StoryViewportSensorThreshold threshold={0} sensor={ViewportScrollSensor} onChange={action('onChange')} />)
  .add('Threshold 25%', () =>
    <StoryViewportSensorThreshold threshold={0.25} sensor={ViewportScrollSensor} onChange={action('onChange')} />)
  .add('Threshold 75%', () =>
    <StoryViewportSensorThreshold threshold={0.75} sensor={ViewportScrollSensor} onChange={action('onChange')} />)
  .add('Threshold 100%', () =>
    <StoryViewportSensorThreshold threshold={1} sensor={ViewportScrollSensor} onChange={action('onChange')} />);
