import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import StoryRouteExample from './StoryRouteExample';
import StoryRouteTruncateRoute from './StoryRouteTruncateRoute';
import StoryRoutePreserveRoute from './StoryRoutePreserveRoute';

storiesOf('Context/route', module)
  .add('Documentation', () => h(ShowDocs, {name: 'route'}))
  .add('Example', () => h(StoryRouteExample))
  .add('Truncates route', () => h(StoryRouteTruncateRoute))
  .add('Preserve route', () => h(StoryRoutePreserveRoute));
