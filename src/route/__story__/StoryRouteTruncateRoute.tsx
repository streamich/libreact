import {createElement as h} from 'react';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route} from '..';

const StoryRouteTruncateRoute = () =>
  <div>
    <Router route='/api/users/123.json'>
      <Route match='/api'>
        <div>
          API
        <Route match='/users'>
          <div>
            USERS
          <Route match={/.*/}>{(result) =>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
          }</Route>
          </div>
        </Route>
        </div>
      </Route>
    </Router>

    <hr />

    <pre style={{fontFamily: 'monospace'}}>{`
<Router route='/api/users/123.json'>
  <Route match='/api'>
    <Route match='/users'>
      <Route match={/.*/}>{(result) =>
        <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
      }</Route>
    </Route>
  </Route>
</Router>
    `}</pre>
  </div>;

export default StoryRouteTruncateRoute;
