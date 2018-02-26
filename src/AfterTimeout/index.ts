import {Component} from 'react';

export interface IAfterTimeoutProps {
  ms?: number;
}

export interface IAfterTimeoutState {
  ready: boolean;
}

export class AfterTimeout extends Component<IAfterTimeoutProps, IAfterTimeoutState> {
  static defaultProps = {
    ms: 200
  };

  state: IAfterTimeoutState = {
    ready: false
  };

  timer;

  componentDidMount () {
    this.timer = setTimeout(() => {
      this.setState({
        ready: true
      });
    }, this.props.ms);
  }

  componentWillUnmount () {
    clearTimeout(this.timer);
  }

  render () {
    return this.state.ready ? this.props.children : null;
  }
}
