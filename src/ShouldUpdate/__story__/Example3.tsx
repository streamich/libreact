import {Component, createElement as h} from 'react';
import {shouldUpdate} from '..';

const Print = ({cnt}) => <span>Click me ({cnt})</span>;
const LazyPrint = shouldUpdate((props) => !(props.cnt % 3))(Print);

export class Example3 extends Component {
  state = {
    cnt: 0
  };

  render () {
    return (
      <div onClick={() => this.setState({cnt: this.state.cnt + 1})}>
        <LazyPrint cnt={this.state.cnt} />
      </div>
    );
  }
}
