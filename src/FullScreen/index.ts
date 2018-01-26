import {Component} from 'react';
import {h, noop} from '../util';
import {enabled, request, exit, on, off} from 'screenfull';

export interface IFullScreenProps {
  children,
  element?: HTMLVideoElement,
  isOn: boolean,
  onClose: () => void,
}

export interface IFullScreenState {

}

class FullScreen extends Component<IFullScreenProps, IFullScreenState> {
  el: HTMLElement = null;

  componentDidMount () {
    on('change', this.onChange);
  }

  componentDidUpdate (props) {
    if (!props.isOn && this.props.isOn) {
      this.enter();
    } else if (props.isOn && !this.props.isOn) {
      this.leave();
    }
  }

  componentWillUnmount () {
    off('change', this.onChange);
  }

  enter () {
    if (this.el && enabled) {
      try {
        request(this.el);
      } catch {}
    }
  }

  leave () {
    try {
      exit();
    } catch {}
  }

  onChange = (isFullScreen) => {
    if (!isFullScreen) {
      (this.props.onClose || noop)();
    }
  };

  render () {
    const {children} = this.props;

    return children;
  }
}

export default FullScreen;
