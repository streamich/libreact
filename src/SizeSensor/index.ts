import * as React from 'react';
import {noop, h} from '../util';
import renderProp from '../util/renderProp';
import faccToHoc, {divWrapper} from '../util/faccToHoc';

const DRAF = (callback) => setTimeout(callback, 35);

export interface ISizeSensorProps extends React.HTMLProps<any> {
  children?: ((size: ISizeSensorState) => React.ReactElement<any>) | React.ReactElement<any>;
  render?: (size: ISizeSensorState) => React.ReactElement<any>;
  onSize?: (size: ISizeSensorState) => void;
}

export interface ISizeSensorState {
  width: number;
  height: number;
}

export class SizeSensor extends React.Component<ISizeSensorProps, ISizeSensorState> {
  state: ISizeSensorState = {
    width: Infinity,
    height: Infinity,
  };

  iframe;
  timeout;
  props: ISizeSensorProps;
  window: Window;

  componentDidMount () {
    this.window = this.iframe.contentWindow;
    if (this.window) {
      this.onWindow(this.window);
    } else {
      const onLoad = () => {
        this.iframe.removeEventListener('load', onLoad);
        this.window = this.iframe.contentWindow;
        this.onWindow(this.window);
      };

      this.iframe.addEventListener('load', onLoad);
    }
  }

  onWindow (wnd: Window) {
    wnd.addEventListener('resize', this.onObjectResize);
    DRAF(() => {
      this.setSize();
    });
  }

  componentWillUnmount () {
    if (this.window) {
      this.window.removeEventListener('resize', this.onObjectResize);
    }
  }

  ref = (iframe) => {
    this.iframe = iframe;
  };

  onObjectResize = () => {
    this.setSize();
  };

  setSize () {
    const size = this.iframe ?
    {
      width: this.iframe.offsetWidth,
      height: this.iframe.offsetHeight
    } :
    {
      width: null,
      height: null
    };

    this.setState(size);
    (this.props.onSize || noop)(size);
  }

  render () {
    const element = renderProp(this.props, this.state);
    const style = element.props.style || {};

    style.position = 'relative';

    return React.cloneElement(element, {style}, ...[
      h('iframe', {
        ref: this.ref,
        style: {
          background: 'transparent',
          border: 'none',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: -1
        }
      }),
      ...React.Children.toArray(element.props.children)
    ]);
  }
}

export const withSize = faccToHoc(SizeSensor, 'size', divWrapper);
