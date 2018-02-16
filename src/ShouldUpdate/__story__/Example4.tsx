import {Component, createElement as h} from 'react';
import {pure} from '../../pure';

const Print = ({cnt}) => {
  console.log('RENDERING');

  return <span>Click me ({cnt})</span>;
};
const LazyPrint = pure(Print);

export class Example4 extends Component {
  state = {
    cnt: 0
  };

  render () {
    return (
      <div onClick={() => this.setState({cnt: this.state.cnt + 1})}>
        <LazyPrint cnt={Math.floor(this.state.cnt / 3) * 3} />
      </div>
    );
  }
}
