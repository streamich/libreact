import {Component, cloneElement} from 'react';
import {render} from 'react-universal-interface';
import * as throttle from 'throttle-debounce/throttle';
import {IUniversalInterfaceProps} from '../typing';
import {noop, on, off} from '../util';
import {getElRect, getRootRect} from '../ViewportScrollSensor';

export interface IParallaxProps extends IUniversalInterfaceProps<IParallaxState> {
  margin?: [number, number, number, number],
  throttle?: number,
  onChange?: (IParallaxState) => void,
}

export interface IParallaxState {
}

export class Parallax extends Component<IParallaxProps, IParallaxState> {
  static defaultProps = {
    margin: [0, 0, 0, 0],
    throttle: 50,
  };

  el: HTMLElement;
  mounted: boolean = false;
  state: IParallaxState = {};

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

    const {margin} = this.props;
    const root = getRootRect(margin);
    const el = getElRect(this.el);

    console.log(root, el);
  });

  render () {
    const element = render(this.props, this.state);

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
