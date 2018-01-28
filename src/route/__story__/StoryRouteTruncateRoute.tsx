import {createElement as h} from 'react';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route} from '..';

const StoryRouteTruncateRoute = () =>
  <div>
    <Router route='/api/users/123.json'>
      <Route match='/api'>
        /api
        <div>
        /api
        <Route match='/users'>
          <div>
            /api/users
          <Route match={/.*/}>{(result) =>
            <div>
              /api/users/.*
              <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
            </div>
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
    <div>
    /api
    <Route match='/users'>
      <div>
        /api/users
      <Route match={/.*/}>{(result) =>
        <div>
          /api/users/.*
          <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
        </div>
      }</Route>
      </div>
    </Route>
    </div>
  </Route>
</Router>
    `}</pre>
  </div>;

export default StoryRouteTruncateRoute;
