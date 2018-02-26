import {Component} from 'react';

const RAF = requestAnimationFrame;

export interface IAfterDrafState {
  ready: boolean;
}

export class AfterDraf extends Component<{}, IAfterDrafState> {
  frame;

  state: IAfterDrafState = {
    ready: false
  };

  componentDidMount () {
    this.frame = RAF(() => {
      this.frame = RAF(() => {
        this.setState({ready: true});
      });
    });
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.frame);
  }

  render () {
    return this.state.ready ? this.props.children : null;
  }
}
