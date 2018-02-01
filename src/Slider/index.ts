import {Component, cloneElement} from 'react';
import {h, noop, on, off} from '../util';
import renderProp from '../util/renderProp';
import * as throttle from 'throttle-debounce/throttle';

export interface ISliderProps {
  children?;
  disabled?: boolean;
  onScrub?: (pos: number) => void;
  onScrubStart?: () => void;
  onScrubStop?: () => void;
  reverse?: boolean;
  value?: number;
  vertical?: boolean;
  throttle?: number;
}

export interface ISliderState {
  isScrubbing?: boolean;
  value?: number;
}

export class Slider extends Component<ISliderProps, ISliderState> {
  static defaultProps = {
    disabled: false,
    reverse: false,
    vertical: false,
    throttle: 50
  };

  LEFT = 'left';
  WIDTH = 'width';
  CLIENT_X = 'clientX';
  el: HTMLElement = null;
  mounted = false;

  constructor (props, context) {
    super(props, context);

    if (props.vertical) {
      this.LEFT = 'top';
      this.WIDTH = 'height';
      this.CLIENT_X = 'clientY';
    }

    this.state = {
      isScrubbing: false,
      value: 0
    };
  }

  componentDidMount () {
    this.mounted = true;
  }

  componentWillUnmount () {
    this.mounted = false;
    this.unbindEvents();
  }

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop) (el);
  };

  onMouseDown = (originalMouseDown) => (event) => {
    (originalMouseDown || noop)(event);
    this.startScrubbing();
    this.onMouseMove(event);
  };

  onTouchStart = (originalTouchStart) => (event) => {
    (originalTouchStart)(event);
    this.startScrubbing();
    this.onTouchMove(event);
  };

  startScrubbing () {
    if (!this.state.isScrubbing) {
      (this.props.onScrubStart || noop)();
      this.setState({isScrubbing: true});
      this.bindEvents();
    }
  }

  stopScrubbing = () => {
    if (this.state.isScrubbing) {
      (this.props.onScrubStop || noop)();
      this.setState({isScrubbing: false});
      this.unbindEvents();
    }
  };

  bindEvents () {
    on(document, 'mousemove', this.onMouseMove);
    on(document, 'mouseup', this.onMouseUp);

    on(document, 'touchmove', this.onTouchMove);
    on(document, 'touchend', this.onTouchEnd);
  }

  unbindEvents () {
    off(document, 'mousemove', this.onMouseMove);
    off(document, 'mouseup', this.onMouseUp);

    off(document, 'touchmove', this.onTouchMove);
    off(document, 'touchend', this.onTouchEnd);
  }

  onMouseMove = (event) => {
    this.onScrub(event[this.CLIENT_X]);
  };

  onMouseUp = this.stopScrubbing;

  onTouchMove = (event) => {
    this.onScrub(event.changedTouches[0][this.CLIENT_X]);
  };

  onTouchEnd = this.stopScrubbing;

  onScrub = throttle(this.props.throttle, false, (clientX) => {
    if (!this.mounted || !this.el) {
      return;
    }

    const {[this.LEFT]: left, [this.WIDTH]: width} = this.el.getBoundingClientRect();

    // This prevents returning 0 when element is hidden by CSS.
    if (!width) {
      return;
    }

    let value = (clientX - left) / width;

    if (value > 1) {
      value = 1;
    } else if (value < 0) {
      value = 0;
    }

    if (this.props.reverse) {
      value = 1 - value;
    }

    this.setState({value});
    (this.props.onScrub || noop)(value);
  });

  render () {
    const {disabled} = this.props;
    const element = renderProp(this.props, this.state);
    const props: any = {
      ref: this.ref(element.ref)
    };

    if (!disabled) {
      props.onMouseDown = this.onMouseDown(element.props.onMouseDown);
      props.onTouchStart = this.onTouchStart(element.props.onTouchStart);
    }

    return cloneElement(element, props);
  }
}
