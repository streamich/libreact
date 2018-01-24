import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ViewportObserverSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import StoryViewportSensorBasic from './StoryViewportSensorBasic';
import StoryViewportSensorHorizontal from './StoryViewportSensorHorizontal';

storiesOf('Sensors/ViewportObserverSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'ViewportObserverSensor'}))
  .add('Basic example', () =>
    <StoryViewportSensorBasic sensor={ViewportObserverSensor} onChange={action('onChange')} />)
  .add('Horizontal', () =>
    <StoryViewportSensorHorizontal sensor={ViewportObserverSensor} onChange={action('onChange')} />);