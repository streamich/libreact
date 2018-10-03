import {Component} from 'react';
import {render, createEnhancer} from 'react-universal-interface';
import {on, off, noop} from '../util';
import {throttle} from 'throttle-debounce';

const equalSets = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

export interface IIdleSensorProps {
  events?: string[];
  ms?: number;
  onChange?: (idle: boolean) => void;
  throttle?: number;
}

export interface IIdleSensorState {
  idle: boolean;
}

export class IdleSensor extends Component<IIdleSensorProps, IIdleSensorState> {
  static defaultProps = {
    events: ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'],
    ms: 1000 * 60 * 2,
    throttle: 50
  }

  state = {
    idle: false
  }

  timeout;

  componentDidMount () {
    this.bindEvents();
    this.setTimeout();
  }

  componentWillUnmount () {
    this.unbindEvents();
    clearTimeout(this.timeout);
  }

  componentDidUpdate (props) {
    if (!equalSets(props.events, this.props.events)) {
      this.unbindEvents();
      this.bindEvents();
    }
  }

  bindEvents () {
    const {events} = this.props;

    for (let i = 0; i < events.length; i++) {
      on(window, events[i], this.onEvent);
    }

    on(document, 'visibilitychange', this.onVisibility);
  }

  unbindEvents () {
    const {events} = this.props;

    for (let i = 0; i < events.length; i++) {
      off(window, events[i], this.onEvent);
    }

    off(document, 'visibilitychange', this.onVisibility);
  }

  onVisibility = () => {
    if (!document.hidden) {
      this.onEvent();
    }
  };

  onEvent = throttle(this.props.throttle, false, () => {
    if (this.state.idle) {
      this.change(false);
    }

    clearTimeout(this.timeout);
    this.setTimeout();
  });

  change (idle: boolean) {
    (this.props.onChange || noop)(idle)
    this.setState({idle})
  }

  onTimeout = () => {
    if (this.state.idle) {
      this.change(false)
    }

    clearTimeout(this.timeout)
    this.setTimeout()
  }

  setTimeout() {
    this.timeout = setTimeout(() => this.change(true), this.props.ms);
  }

  render() {
    return render(this.props, this.state);
  }
}

export const withIdle = createEnhancer(IdleSensor, 'idle');
