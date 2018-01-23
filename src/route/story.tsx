import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/styles/hljs'
import {LocationSensor} from '../LocationSensor';
import {Router, Route} from '.';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Context/route', module)
  .add('Documentation', () => h(ShowDocs, {name: 'route'}))
  .add('Example', () =>
    <Router>
      <div>
        <ul>
          <li onClick={() => history.pushState(null, '', '/home.html')}>Home</li>
          <li onClick={() => history.pushState(null, '', '/home/intro.html')}>Home / Intro</li>
          <li onClick={() => history.pushState(null, '', '/home/more.html')}>Home / More</li>
          <li onClick={() => history.pushState(null, '', '/page.html')}>Page</li>
          <li onClick={() => history.pushState(null, '', '/404.html')}>404</li>
        </ul>

        <Route match='/home'>{() =>
          <div>
            <div>HOME</div>
            <Route match='/intro'>
              <div>INTRO</div>
            </Route>
            <Route children={<div>404</div>} />
          </div>
        }</Route>

        <Route match={/^\/page\.html/} children={<div>PAGE</div>} />
        <Route children={<div>404</div>} />

        <br />
        <hr />

        <LocationSensor>{(state) =>
          <pre style={{fontFamily: 'monospace'}}>
            {JSON.stringify(state, null, 4)}
          </pre>
        }</LocationSensor>
      </div>
    </Router>
  )
  .add('Truncates route', () =>
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
    </div>
  )
  .add('Preserve route', () =>
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
    </div>
  );
