import * as React from 'react';
import {on, off, noop} from '../util';
import {throttle} from 'throttle-debounce';
import renderProp from '../util/renderProp';
import {IUniversalInterfaceProps} from '../typing';

export type TMargin = [number, number, number, number];
export type TRect = [number, number, number, number];

export const getElRect = (el): TRect => {
  const {top, left, bottom, right} = el.getBoundingClientRect();

  return [left, top, right, bottom];
};

export const getRootRect = ([top, right, bottom, left]: TMargin): TRect => {
  return [
    0 - left,
    0 - top,
    (window.innerWidth || document.documentElement.clientWidth) + right,
    (window.innerHeight || document.documentElement.clientHeight) + bottom,
  ];
};

// Compute intersection of two NORMALIZED rectangles.
type TIntersect = (react1: TRect, rect2: TRect) => TRect;
const intersect: TIntersect = (rect1, rect2) => {
  const [x1, y1, x2, y2] = rect1;
  const [x3, y3, x4, y4] = rect2;

  const x5 = Math.max(x1, x3);
  const x6 = Math.min(x2, x4);

  const y5 = Math.max(y1, y3);
  const y6 = Math.min(y2, y4);

  if ((x5 >= x6) || (y5 >= y6)) {
    return null;
  }

  return [x5, y5, x6, y6];
};

// Compute area of a NORMALIZED rectangle.
type TArea = (react: TRect) => number;
const area: TArea = ([x1, y1, x2, y2]) => (x2 - x1) * (y2 - y1);

export interface IViewportScrollSensorProps extends IUniversalInterfaceProps<IViewportScrollSensorState> {
  margin?: TMargin;
  threshold?: number;
  throttle?: number;
  poll?: number;
  onChange?: (state: IViewportScrollSensorState) => void;
}

export interface IViewportScrollSensorState {
  visible: boolean;
}

export class ViewportScrollSensor extends React.Component<IViewportScrollSensorProps, IViewportScrollSensorState> {
  static defaultProps = {
    threshold: 0,
    throttle: 50,
    margin: [0, 0, 0, 0]
  } as any;

  mounted: boolean = false;
  el: HTMLElement;
  pollTimer;

  state: IViewportScrollSensorState = {
    visible: false
  };

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  componentDidMount () {
    this.mounted = true;

    on(document, 'scroll', this.onScroll);
    on(window, 'resize', this.onScroll);
    this.onScroll();
    if (this.props.poll) {
      setTimeout(this.poll, this.props.poll);
    }
  }

  componentWillUnmount () {
    this.mounted = false;

    clearTimeout(this.pollTimer);
    off(document, 'scroll', this.onScroll);
    off(window, 'resize', this.onScroll);
  }

  poll = () => {
    if (this.mounted) {
      this.onScroll();
      setTimeout(this.poll, this.props.poll);
    }
  };

  onCalculation (visible, rectRoot: TRect, rectEl: TRect, rectIntersection: TRect) {
    if (visible !== this.state.visible) {
      const state = {
        visible
      };

      this.setState(state);
      (this.props.onChange || noop)(state);
    }
  }

  onScroll = throttle(this.props.throttle, false, () => {
    if (!this.mounted) {
      return;
    }

    const {threshold, margin} = this.props;
    let visible = false;

    const rectRoot = getRootRect(margin);
    const rectEl = getElRect(this.el);
    const rectIntersection = intersect(rectEl, rectRoot);

    if (rectIntersection) {
      const areaEl = area(rectEl);
      const areaIntersection = area(rectIntersection);
      const intersectionRatio = areaIntersection / areaEl;

      visible = !!((!threshold && intersectionRatio) || (intersectionRatio >= threshold));
    }

    this.onCalculation(visible, rectRoot, rectEl, rectIntersection);
  });

  render () {
    const element = renderProp(this.props, this.state);

    if (process.env.NODE_ENV !== 'production') {
      if ((typeof element !== 'object') || (typeof element.type !== 'string')) {
        throw new TypeError(
          '<ViewportScrollSensor> accepts a single child which must be ' +
          'a plain DOM element or a function that returns one.'
        );
      }
    }

    return React.cloneElement(element, {
      ref: this.ref(element.ref)
    });
  }
}
