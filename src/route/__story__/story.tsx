import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import ShowDocs from '../../../.storybook/ShowDocs'
import {Router} from '..';
import StoryRouteExample from './StoryRouteExample';

storiesOf('Context/route', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/routing.md')}))
  .add('Renders children', () =>
    <Router route='/test'>
      <div>Renders</div>
      <div>its</div>
      <div>children</div>
    </Router>
  )
  .add('Example 1', () => <StoryRouteExample />)
