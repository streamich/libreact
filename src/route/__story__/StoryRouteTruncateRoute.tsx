import {createElement as h} from 'react';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route} from '..';

const StoryRouteTruncateRoute = () =>
  <div>
    <Router route='/api/users/43f23f-23f34f43r.json'>
      <Route match='/api'>
        <Route match='/users'>
          <Route match={/.*/}>{(result) =>
            <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(result, null, 4)}</pre>
          }</Route>
        </Route>
      </Route>
    </Router>

    <hr />

    <pre style={{fontFamily: 'monospace'}}>{`
<Router route='/api/users/43f23f-23f34f43r.json'>
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
