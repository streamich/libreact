import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ViewportScrollSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import StoryViewportSensorBasic from '../../ViewportObserverSensor/__story__/StoryViewportSensorBasic';

storiesOf('Sensors/ViewportScrollSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'ViewportScrollSensor'}))
  .add('Basic example', () =>
    <StoryViewportSensorBasic sensor={ViewportScrollSensor} onChange={action('onChange')} />);
