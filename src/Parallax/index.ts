import {Component, cloneElement} from 'react';
import {render} from 'react-universal-interface';
import * as throttle from 'throttle-debounce/throttle';
import {IUniversalInterfaceProps} from '../typing';
import {noop, on, off} from '../util';
import {getElRect, getRootRect, TRect} from '../ViewportScrollSensor';

const zeros: TRect = [0, 0, 0, 0];

export interface IParallaxProps extends IUniversalInterfaceProps<IParallaxState> {
  margin?: [number, number, number, number],
  throttle?: number,
  onChange?: (IParallaxState) => void,
}

export interface IParallaxState {
  value: number,
  el: TRect,
  root: TRect,
}

export class Parallax extends Component<IParallaxProps, IParallaxState> {
  static defaultProps = {
    margin: zeros,
    throttle: 50,
  };

  el: HTMLElement;
  mounted: boolean = false;
  state: IParallaxState = {
    value: 0,
    el: zeros,
    root: zeros,
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

  change (newState) {
    this.setState(newState);
    (this.props.onChange || noop)(newState);
  }

  onScroll = throttle(this.props.throttle, false, () => {
    if (!this.mounted) {
      return;
    }

    const {margin} = this.props;
    const el = getElRect(this.el);
    const root = getRootRect(margin);

    const rootHeight = root[3] - root[1];
    const elHeight = el[3] - el[1];
    const distance = rootHeight + elHeight;
    const remaining = distance - (el[3] - root[1]);
    const value = Math.max(0, Math.min(1, remaining / distance));

    if (value > 0 && value < 1) {
      this.change({value, el, root});
    } else {
      if (this.state.value > 0 && this.state.value < 1) {
        this.change({value, el, root});
      }
    }
  });

  render () {
    const element = render(this.props, this.state);

    if (process.env.NODE_ENV !== 'production') {
      if ((typeof element !== 'object') && (typeof element.type !== 'string')) {
        throw new TypeError(
          '<Parallax> accepts a single child which must be ' +
          'a plain DOM element or a function that returns one.'
        );
      }
    }

    return cloneElement(element, {
      ref: this.ref(element.ref)
    });
  }
}
