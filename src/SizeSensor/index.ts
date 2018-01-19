import {Component, createElement as h} from 'react';
import Types from 'prop-types';
import {idx, noop} from '../util';

const DRAF = (callback) => setTimeout(callback, 35);

export interface ISizeSensorProps extends React.HTMLProps<any> {
  children?: (size: ISizeSensorState) => any;
  refElement?;
  tagName?: string;
}

export interface ISizeSensorState {
  width: number;
  height: number;
}

class SizeSensor extends Component<ISizeSensorProps, ISizeSensorState> {
  state: ISizeSensorState = {
    width: null,
    height: null,
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
    this.setState(this.iframe ?
      {
        width: this.iframe.offsetWidth,
        height: this.iframe.offsetHeight
      } :
      {
        width: null,
        height: null
      }
    );
  }

  render () {
    const {children, refElement, tagName, ...rest} = this.props;

    rest.ref = refElement;

    if (!rest.style) {
      rest.style = {};
    }

    rest.style.position = 'relative';

    return h(tagName || 'div', rest,
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
      children(this.state)
    );
  }
}

export default SizeSensor;
