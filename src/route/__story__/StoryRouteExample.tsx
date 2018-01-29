import {createElement as h} from 'react';
import {LocationSensor} from '../../LocationSensor';
import {Router, Route, Route404} from '..';

const StoryRouteExample = () => (
  <Router>
    <div>
      <ul>
        <li onClick={() => history.pushState(null, '', '/home')}>Home</li>
        <li onClick={() => history.pushState(null, '', '/home/intro.html')}>Home / Intro</li>
        <li onClick={() => history.pushState(null, '', '/home/more.html')}>Home / More</li>
        <li onClick={() => history.pushState(null, '', '/page.html')}>Page</li>
        <li onClick={() => history.pushState(null, '', '/404.html')}>404</li>
      </ul>

      <Route match='/home'>{() =>
        <div>
          <div>HOME</div>
          <Route match='/intro' children={<div>HOME/INTRO</div>} />
          <Route404 children={<div>HOME/404</div>} />
        </div>
      }</Route>
      <Route match={/^\/page\.html/} render={<div>PAGE</div>} />
      <Route404 children={<div>404</div>} />

      <br />
      <hr />

      <LocationSensor>{(state) =>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      }</LocationSensor>

      <br />
      <hr />

      <pre style={{fontFamily: 'monospace'}}>{`
<Route match='/home'>{() =>
  <div>
    <div>HOME</div>
    <Route match='/intro' children={<div>INTRO</div>} />
    <Route children={<div>HOME/404</div>} />
  </div>
}</Route>
<Route match={/^\/page\.html/} render={<div>PAGE</div>} />
<Route max={0} children={<div>404</div>} />
      `}</pre>
    </div>
  </Router>
);

export default StoryRouteExample;
