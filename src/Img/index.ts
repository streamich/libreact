import {Component} from 'react';
import {h, isClient, noop} from '../util';

const enum STATE {
  LOADING,
  DONE,
  ERROR,
}

export interface IImgProps extends React.AllHTMLAttributes<any> {
  renderLoad?: (img, props?: IImgProps, state?: STATE) => React.ReactElement<any>;
  renderError?: (img?, props?: IImgProps, state?: STATE) => React.ReactElement<any>;
  $ref?: any;
}

export interface IImgState {
  state: STATE;
  error?: string;
}

export class Img extends Component<IImgProps, IImgState> {
  state: IImgState = {
    state: STATE.LOADING
  };

  onLoad = (originalOnLoad) => (event) => {
    this.setState({state: STATE.DONE});
    (originalOnLoad || noop)(event);
  };

  onError = (originalOnError) => (event) => {
    this.setState({state: STATE.ERROR});
    (originalOnError || noop)(event);
  }

  render () {
    const {renderLoad, renderError, onLoad, onError, $ref, ...rest} = this.props;

    if (!isClient) {
      return h('img', rest);
    }

    (rest as any).onLoad = this.onLoad(onLoad);
    (rest as any).onError = this.onError(onError);

    if ($ref) {
      (rest as any).ref = $ref;
    }

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
