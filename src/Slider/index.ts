/*
import {Component, createElement as h} from 'react';
import Types from 'prop-types';
import {noop} from '../../helpers';

const on = (name, listener) => document.addEventListener(name, listener);
const off = (name, listener) => document.removeEventListener(name, listener);

class Slider extends Component {
  static propTypes = {
    children: Types.func.isRequired,
    disabled: Types.bool,
    onScrub: Types.func.isRequired,
    onScrubStart: Types.func.isRequired,
    onScrubStop: Types.func.isRequired,
    reverse: Types.bool,
    value: Types.number.isRequired,
    vertical: Types.bool
  };

  static defaultProps = {
    disabled: false,
    reverse: false,
    vertical: false
  };

  LEFT = 'left';
  WIDTH = 'width';
  CLIENT_X = 'clientX';
  element;
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

  ref = (element) => {
    this.element = element;
  };

  handleMouseDown = (event) => {
    this.startScrubbing();
    this.onMouseMove(event);
  };

  handleTouchStart = (event) => {
    this.startScrubbing();
    this.onTouchMove(event);
  };

  startScrubbing () {
    if (!this.state.isScrubbing) {
      this.props.onScrubStart();
      this.setState({isScrubbing: true});
      this.bindEvents();
    }
  }

  stopScrubbing = () => {
    if (this.state.isScrubbing) {
      this.props.onScrubStop();
      this.setState({isScrubbing: false});
      this.unbindEvents();
    }
  };

  bindEvents () {
    on('mousemove', this.onMouseMove);
    on('mouseup', this.onMouseUp);

    on('touchmove', this.onTouchMove);
    on('touchend', this.onTouchEnd);
  }

  unbindEvents () {
    off('mousemove', this.onMouseMove);
    off('mouseup', this.onMouseUp);

    off('touchmove', this.onTouchMove);
    off('touchend', this.onTouchEnd);
  }

  onMouseMove = (event) => {
    this.onScrub(event[this.CLIENT_X]);
  };

  onMouseUp = this.stopScrubbing;

  onTouchMove = (event) => {
    this.onScrub(event.changedTouches[0][this.CLIENT_X]);
  };

  onTouchEnd = this.stopScrubbing;

  onScrub = throttle((clientX) => {
    if (!this.mounted || !this.element) {
      return;
    }

    const {[this.LEFT]: left, [this.WIDTH]: width} = this.element.getBoundingClientRect();

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
    this.props.onScrub(value);
  }, 50);

  render () {
    const {children, disabled, onScrub, onScrubStart, onScrubStop, reverse, value: propsValue, vertical, ...passThrough} = this.props;
    const {isScrubbing, value: stateValue} = this.state;
    const value = isScrubbing ? stateValue : propsValue;

    return (
      <div
        onMouseDown={disabled ? noop : this.handleMouseDown}
        onTouchStart={disabled ? noop : this.handleTouchStart}
        ref={this.ref}
        {...passThrough}
      >{children(value)}</div>
    );
  }
}

export default Slider;

*/
