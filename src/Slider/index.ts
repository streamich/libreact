import * as React from 'react';
import {noop, on, off} from '../util';
import renderProp from '../util/renderProp';
import {throttle} from 'throttle-debounce';

export interface ISliderProps {
  children?: React.ReactElement<any> | ((state: ISliderState) => React.ReactElement<any>);
  render?: (state: ISliderState) => React.ReactElement<any>;
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
  isSliding?: boolean;
  value?: number;
  pos?: number;
  length?: number;
}

export class Slider extends React.Component<ISliderProps, ISliderState> {
  static defaultProps = {
    disabled: false,
    reverse: false,
    vertical: false,
    throttle: 50,
    value: 0
  };

  LEFT = 'left';
  WIDTH = 'width';
  CLIENT_X = 'clientX';
  el: HTMLElement = null;
  mounted = false;
  state;

  constructor (props, context) {
    super(props, context);

    if (props.vertical) {
      this.LEFT = 'top';
      this.WIDTH = 'height';
      this.CLIENT_X = 'clientY';
    }

    this.state = {
      isSliding: false,
      value: this.props.value
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
    (originalTouchStart || noop)(event);
    this.startScrubbing();
    this.onTouchMove(event);
  };

  startScrubbing () {
    if (!this.state.isSliding && this.mounted) {
      (this.props.onScrubStart || noop)();
      this.setState({isSliding: true});
      this.bindEvents();
    }
  }

  stopScrubbing = () => {
    if (this.state.isSliding && this.mounted) {
      (this.props.onScrubStop || noop)();
      this.setState({isSliding: false});
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

    const {[this.LEFT]: pos, [this.WIDTH]: length} = this.el.getBoundingClientRect();

    // This prevents returning 0 when element is hidden by CSS.
    if (!length) {
      return;
    }

    let value = (clientX - pos) / length;

    if (value > 1) {
      value = 1;
    } else if (value < 0) {
      value = 0;
    }

    if (this.props.reverse) {
      value = 1 - value;
    }

    this.setState({
      value,
      pos: clientX - pos,
      length
    });
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

    return React.cloneElement(element, props);
  }
}
