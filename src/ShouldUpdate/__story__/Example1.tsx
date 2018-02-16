import {Component, createElement as h} from 'react';
import {ShouldUpdate} from '..';

export class Example1 extends Component {
  state = {
    cnt: 0
  };

  render () {
    return (
      <ShouldUpdate when={(props) => props.cnt > 3} props={this.state}>
        <div onClick={() => this.setState({cnt: this.state.cnt + 1})}>
          Click me ({this.state.cnt})
        </div>
      </ShouldUpdate>
    );
  }
}
