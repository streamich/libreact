import {Component} from 'react';
import {h, isClient} from '../util';

const enum STATE {
  LOADING,
  DONE,
  ERROR,
}

export interface IImgProps extends React.AllHTMLAttributes<any> {
  renderLoad?: (img?, props?: IImgProps, state?: STATE) => React.ReactElement<any>;
  renderError?: (img, props?: IImgProps, state?: STATE) => React.ReactElement<any>;
}

export interface IImgState {
  state: STATE;
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
        return renderLoad ? renderLoad(img, this.props, state) : img;
      case STATE.DONE:
        return img;
      case STATE.ERROR:
        return renderError || renderLoad ?
          (renderError || renderLoad)(img, this.props, state) :
          img;
    }
  }
}
