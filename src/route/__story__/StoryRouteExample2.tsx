import {h} from '../../util';
import {Router, Route, go, Go} from '..';
import {Link} from '../../Link';

const StoryRouteExample2 = () => (
  <Router>
    <div>
      <ul>
        <li><a onClick={() => go('/')}>Home</a></li>
        <li><Go to='/about'>About</Go></li>
        <li><Link a to='/topics'><span>Topics</span></Link></li>
      </ul>

      <hr/>

      <Route exact match='/' comp={Home} />
      <Route match='/about' component={About} />
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

const Topics = (props) => {
  const {match} = props;

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match}/rendering`}>
            Rendering with React
          </Link>
        </li>
        <li>
          <Link a to={`${match}/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match}/props-v-state`}>
            <a>Props v. State</a>
          </Link>
        </li>
      </ul>

      <Route  comp={Topic}/>
      <Route exact match={match} children={() => (
        <h3>Please select a topic.</h3>
      )}/>
    </div>
  );
};

const Topic = ({match}) => (
  <div>
    <h3>{match}</h3>
  </div>
);

export default StoryRouteExample2;
