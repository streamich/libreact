import {Component, cloneElement} from 'react';
import {h, on, off, noop} from '../util';
import * as throttle from 'throttle-debounce/throttle';

export const isInViewport = (el: HTMLElement) => {
  const {top, left, bottom, right} = el.getBoundingClientRect();

  return (
      top >= 0 &&
      left >= 0 &&
      bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export interface IViewportScrollSensorProps {
  check?: (el: HTMLElement) => boolean;
  tagName?: string;
  throttle?: number;
  refInner?: (el: HTMLElement) => void;
  onChange?: (state: IViewportScrollSensorState) => void;
}

export interface IViewportScrollSensorState {
  visible: boolean;
}

export class ViewportScrollSensor extends Component<IViewportScrollSensorProps, IViewportScrollSensorState> {
  static defaultProps = {
    check: isInViewport,
    throttle: 150
  };

  mounted: boolean = false;
  el: HTMLElement;

  state = {
    visible: false
  };

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  componentDidMount () {
    this.mounted = true;
    on(document, 'scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount () {
    this.mounted = false;
    off(document, 'scroll', this.onScroll);
  }

  onScroll = throttle(this.props.throttle, false, () => {
    if (!this.mounted) {
      return;
    }

    const visible = this.props.check(this.el);

    if (visible !== this.state.visible) {
      const state = {
        visible
      };

      this.setState(state);
      (this.props.onChange || noop)(state);
    }
  });

  render () {
    const {children} = this.props;
    const element = typeof children === 'function' ? children(this.state) : children;

    if (process.env.NODE_ENV !== 'production') {
      if ((typeof element !== 'object') || (typeof element.type !== 'string')) {
        throw new TypeError(
          '<ViewportScrollSensor> accepts a single child which must be ' +
          'a plain DOM element or a function that returns one.'
        );
      }
    }

    return cloneElement(element, {
      ref: this.ref(element.ref)
    });
  }
}
