import {Component} from 'react';
import {on, off} from '../util';

export interface INetworkProps {
  children?: (INetworkState) => React.ReactElement<any>;
}

export interface INetworkState {
  online: boolean;
  since: Date;
}

export class Network extends Component<INetworkProps, INetworkState> {
  componentDidMount() {
    on(window, 'online', this.onOnline);
    on(window, 'offline', this.onOffline);
  }

  componentWillUnmount() {
    off(window, 'online', this.onOnline);
    off(window, 'offline', this.onOffline);
  }

  onOnline = () => {
    this.setState({
      online: true,
      since: new Date()
    });
  };

  onOffline = () => {
    this.setState({
      online: false,
      since: new Date()
    });
  };

  render () {
    return this.props.children(this.state);
  }
}
