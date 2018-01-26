import {Component} from 'react';
import {h, noop} from '../util';
const screenfull = require('screenfull');

export interface IFullScreenProps {
  children?,
  el: HTMLVideoElement,
  on?: boolean,
  onClose?: () => void,
}

export interface IFullScreenState {

}

export class FullScreen extends Component<IFullScreenProps, IFullScreenState> {
  componentDidMount () {
    screenfull.on('change', this.onChange);
  }

  componentDidUpdate (props) {
    if (!props.on && this.props.on) {
      this.enter();
    } else if (props.on && !this.props.on) {
      this.leave();
    }
  }

  componentWillUnmount () {
    screenfull.off('change', this.onChange);
  }

  enter () {
    if (this.props.el && screenfull.enabled) {
      try {
        screenfull.request(this.props.el);
      } catch {}
    }
  }

  leave () {
    try {
      screenfull.exit();
    } catch {}
  }

  onChange = () => {
    const isFullScreen = screenfull.element === this.props.el;

    console.log('IS FS', isFullScreen);
  };

  render () {
    const {children} = this.props;

    return children;
  }
}
