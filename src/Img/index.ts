import {Component} from 'react';
import {h, noop} from '../util';

export interface IImgProps {
  renderLoad?: (props?: IImgProps) => React.ReactElement<any>;
  renderError?: (props?: IImgProps) => React.ReactElement<any>;
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
    const {renderLoad, renderError, ...rest} = this.props;
    const {state} = this.state;

    (rest as any).onLoad = this.onLoad;
    (rest as any).onError = this.onError;

    if (state > 0) {
      return h('img', rest);
    }

    if (state < 0) {
      return (renderError || renderLoad || noop)(this.props);
    }

    return (renderLoad || noop)(this.props);
  }
}
