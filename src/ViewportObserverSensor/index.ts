import {Component, cloneElement} from 'react';
import {h, on, off, noop} from '../util';

export interface IViewportObserverSensorProps {
  margin?: [number, number, number, number];
  threshold?: number;
  onChange?: (state: IViewportObserverSensorState) => void;
}

export interface IViewportObserverSensorState {
  visible: boolean;
}

export class ViewportObserverSensor extends Component<IViewportObserverSensorProps, IViewportObserverSensorState> {
  static defaultProps = {
    threshold: 0,
    margin: [0, 0, 0, 0]
  };

  mounted: boolean = false;
  el: HTMLElement = null;
  observer: IntersectionObserver = null;

  state = {
    visible: false
  };

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  componentDidMount () {
    const {margin, threshold} = this.props;

    this.mounted = true;

    this.observer = new IntersectionObserver(this.onObserve, {
      rootMargin: margin.map((val) => val + 'px').join(' '),
      threshold
    });
    this.observer.observe(this.el);
  }

  componentWillUnmount () {
    this.mounted = false;

    this.observer.unobserve(this.el);
  }

  onObserve = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    const {intersectionRatio} = entry;
    const {threshold, onChange = noop} = this.props;

    const state = {
      visible: !!((!threshold && intersectionRatio) || (intersectionRatio >= threshold))
    };

    this.setState(state);
    onChange(state);
  };

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
