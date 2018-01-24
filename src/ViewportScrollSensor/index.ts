import {Component} from 'react';
import {h, on, off} from '../util';
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
}

export interface IViewportScrollSensorState {
  visible: boolean;
}

export class ViewportScrollSensor extends Component<IViewportScrollSensorProps, IViewportScrollSensorState> {
  static defaultProps = {
    throttle: 150
  };

  el: HTMLElement;

  state = {
    visible: false
  };

  ref = (el) => {
    this.el = el;
  };

  componentWillMount () {
    // TODO: TRY TO DETECT IF COMPONENT IS VISIBLE.
  }

  componentDidMount () {
    on(document, 'scroll', this.onScroll);
  }

  componentWillUnmount () {
    off(document, 'scroll', this.onScroll);
  }

  onScroll = throttle(this.props.throttle, false, () => {
    this.setState({
      visible: isInViewport(this.el)
    });
  });

  render () {
    const {children} = this.props;

    return h('div', {},
      typeof children === 'function' ? children(this.state) : children
    );
  }
}
