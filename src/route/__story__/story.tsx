import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import StoryRouteExample from './StoryRouteExample';
import StoryRouteExample2 from './StoryRouteExample2';
import StoryRouteTruncateRoute from './StoryRouteTruncateRoute';
import StoryRoutePreserveRoute from './StoryRoutePreserveRoute';

storiesOf('Context/route', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/routing.md')}))
  .add('Example', () => h(StoryRouteExample))
  .add('Example 2', () => h(StoryRouteExample2))
  .add('Truncates route', () => h(StoryRouteTruncateRoute))
  .add('Preserve route', () => h(StoryRoutePreserveRoute));
