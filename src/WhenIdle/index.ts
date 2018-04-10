import {Component} from 'react';

const RIC = (window as any).requestIdleCallback || ((fn, {timeout = 35} = {}) => setTimeout(fn, timeout));

export interface IWhenIdleProps {
  timeout?: number;
}

export interface IWhenIdleState {
  ready: boolean;
}

export class WhenIdle extends Component<IWhenIdleProps, IWhenIdleState> {
  mounted = false;

  state: IWhenIdleState = {
    ready: false
  };

  componentDidMount () {
    this.mounted = true;

    const {timeout} = this.props;

    RIC(() => {
      if (this.mounted) {
        this.setState({ready: true});
      }
    }, {timeout});
  }

  componentWillUnmount () {
    this.mounted = false;
  }

  render () {
    return this.state.ready ? this.props.children : null;
  }
}
