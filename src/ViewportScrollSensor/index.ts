import {Component} from 'react';
import {h, on, off, noop} from '../util';
import * as throttle from 'throttle-debounce/throttle';

export const isInViewport = (el) => {
  const {top, left, bottom, right} = el.getBoundingClientRect();

  return (
      top >= 0 &&
      left >= 0 &&
      bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export interface IViewportScrollSensorProps {
  throttle?: number;
  refInner?: (el: HTMLElement) => void;
}

export interface IViewportScrollSensorState {
  visible: boolean;
}

export class ViewportScrollSensor extends Component<IViewportScrollSensorProps, IViewportScrollSensorState> {
  static defaultProps = {
    throttle: 150
  };

  mounted: boolean = false;
  el: HTMLElement;

  state = {
    visible: false
  };

  ref = (el) => {
    this.el = el;
    (this.props.refInner || noop)(el);
  };

  componentDidMount () {
    this.mounted = true;
    on(document, 'scroll', this.onScroll);
  }

  componentWillUnmount () {
    this.mounted = false;
    off(document, 'scroll', this.onScroll);
  }

  onScroll = throttle(this.props.throttle, false, () => {
    if (!this.mounted) {
      return;
    }

    const visible = isInViewport(this.el);

    if (visible !== this.state.visible) {
      this.setState({
        visible: isInViewport(this.el)
      });
    }
  });

  render () {
    const {children, refInner, ...rest} = this.props;

    Object.assign(rest, {
      ref: this.ref
    });

    return h('div', rest,
      typeof children === 'function' ? children(this.state) : children
    );
  }
}
