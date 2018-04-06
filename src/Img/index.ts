import {Component} from 'react';
import {h, noop} from '../util';

export interface IImgProps {
  renderSpinner?: () => React.ReactElement<any>;
  renderError?: () => React.ReactElement<any>;
}

export interface IImgState {
  state: number;
}

export class Img extends Component<IImgProps, IImgState> {
  state = {
    state: 0
  };

  onLoad = () => this.setState({state: 1});
  onError = () => this.setState({state: -1});

  render () {
    const {renderSpinner, renderError, ...rest} = this.props;
    const {state} = this.state;

    (rest as any).onLoad = this.onLoad;
    (rest as any).onError = this.onError;

    if (state > 0) {
      return h('img', rest);
    }

    if (state < 0) {
      return (renderError || renderSpinner || noop)(this.props);
    }

    return (renderSpinner || noop)(this.props);
  }
}
