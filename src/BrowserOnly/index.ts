import {Component} from 'react';

export interface IBrowserOnlyProps {
  children?;
}

export interface IBrowserOnlyState {
  isClient: boolean;
}

export class BrowserOnly extends Component<IBrowserOnlyProps, IBrowserOnlyState> {
  state: IBrowserOnlyState = {
    isClient: false
  };

  componentDidMount () {
    this.setState({
      isClient: true
    });
  }

  render () {
    return this.state.isClient ? this.props.children : null;
  }
}
