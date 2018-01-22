import {Component, createElement as h} from 'react';
import {isClient} from '../util';
import * as throttle from 'throttle-debounce/throttle';

export interface ISyncSensorProps<TState> {
  throttle?: number;
  initial?: TState;
  children?: (state: TState) => React.ReactElement<any>;
  addListener: (handler) => void;
  removeListener: (handler) => void;
  onEvent: (event) => TState;
}

export class SyncSensor<TState> extends Component<ISyncSensorProps<TState>, TState> {
  static defaultProps = {
    throttle: 100
  };

  frame;
  state: TState;
  onEvent;

  constructor (props, context) {
    super(props, context);

    this.state = props.initial || {};

    this.onEvent = throttle(this.props.throttle, false, (event) => {
      const state = this.props.onEvent(event);

      this.setState(state);
    });
  }

  componentDidMount () {
    this.props.addListener(this.onEvent);
  }

  componentWillUnmount () {
    this.props.removeListener(this.onEvent);
  }

  render () {
    return this.props.children(this.state);
  }
}
