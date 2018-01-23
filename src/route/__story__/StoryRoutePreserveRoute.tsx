import {createElement as h} from 'react';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route} from '..';

const StoryRoutePreserveRoute = () =>
  <div>
    <Router route='/api/users/id/123'>
      <Route preserve match='/api'>
        <Route preserve match='/api/users'>
          <Route preserve match='/api/users/id'>
            <Route preserve match={/\/api\/users\/id\/(.*)/}>{(result) =>
              <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
            }</Route>
          </Route>
        </Route>
      </Route>
    </Router>

    <hr />

    <pre style={{fontFamily: 'monospace'}}>{`
<Router route='/api/users/id/123'>
  <Route preserve match='/api'>
    <Route preserve match='/api/users'>
      <Route preserve match='/api/users/id'>
        <Route preserve match={/\/api\/users\/id\/(.*)/}>{(result) =>
          <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
        }</Route>
      </Route>
    </Route>
  </Route>
</Router>
    `}</pre>
  </div>;

export default StoryRoutePreserveRoute;
