import {h} from '../../util';
import {Router, Route} from '..';

const StoryRouteExample2 = () => (
  <Router>
    <div>
      <ul>
        <li><a onClick={() => history.pushState(null, '', '/')}>Home</a></li>
        <li><a onClick={() => history.pushState(null, '', '/about')}>About</a></li>
        <li><a onClick={() => history.pushState(null, '', '/topics')}>Topics</a></li>
      </ul>

      <hr/>

      <Route exact match='/' comp={Home} />
      <Route match='/about' comp={About} />
      <Route match='/topics' comp={Topics} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
          Rendering with React
      </li>
      <li>
          Components
      </li>
      <li>
          Props v. State
      </li>
    </ul>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default StoryRouteExample2;
