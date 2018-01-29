import {createElement as h} from 'react';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route} from '..';

const StoryRouteTruncateRoute = () =>
  <div>
    <Router route='/api/users/123.json'>
      <Route match='/api'>
        /api
        <Route match='/users'>
          /api/users
          <Route match={/.*/}>{(result) =>
            <div>
              /api/users/.*
              <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
            </div>
          }</Route>
        </Route>
      </Route>
    </Router>

    <hr />

    <pre style={{fontFamily: 'monospace'}}>{`
<Router route='/api/users/123.json'>
  <Route match='/api'>
    /api
    <Route match='/users'>
      /api/users
      <Route match={/.*/}>{(result) =>
        <div>
          /api/users/.*
          <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
        </div>
      }</Route>
    </Route>
  </Route>
</Router>
    `}</pre>
  </div>;

export default StoryRouteTruncateRoute;
