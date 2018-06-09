import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import ShowDocs from '../../../.storybook/ShowDocs'
import {Router, Route} from '..';
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
  .add('Matches a route', () =>
    <Router route='/test'>
      <Route match='/test'>
        <div>Children</div>
      </Route>
      <Route match='/test'>{() =>
        <div>Facc</div>
      }</Route>
      <Route match='/test' render={() => <div>Render prop</div>} />
      <Route match='/test' comp={() => <div>Component prop 1</div>} />
      <Route match='/test' component={() => <div>Compnent prop 2</div>} />


      <Route match='/no-match'>
        <div>THIS SHOUDL NOT MATCH</div>
      </Route>
    </Router>
  )
  .add('Example 1', () => <StoryRouteExample />)
