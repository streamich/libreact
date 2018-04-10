import {Component} from 'react';
import {h, noop, isClient} from '../util';

const enum STATE {
  LOADING,
  DONE,
  ERROR,
}

export interface IImgProps {
  renderLoad?: (props?: IImgProps) => React.ReactElement<any>;
  renderError?: (props?: IImgProps) => React.ReactElement<any>;
}

export interface IImgState {
  state: number;
}

export class Img extends Component<IImgProps, IImgState> {
  state = {
    state: STATE.LOADING
  };

  onLoad = () => this.setState({state: STATE.DONE});
  onError = () => this.setState({state: STATE.ERROR});

  render () {
    const {renderLoad, renderError, ...rest} = this.props;

    if (!isClient) {
      return h('img', rest);
    }

    (rest as any).onLoad = this.onLoad;
    (rest as any).onError = this.onError;

    const {state} = this.state;
    const img = h('img', rest);

    switch (state) {
      case STATE.LOADING:
        return (renderLoad || noop)(img, this.props, state);
      case STATE.DONE:
        return img;
      case STATE.ERROR:
        return (renderError || renderLoad || noop)(img, this.props, state);
    }
  }
}
