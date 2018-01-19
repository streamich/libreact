import {Component, createElement as h} from 'react';
import {isClient} from '../util';

export interface ISyncSensorProps<TState> {
  initial?: TState;
  children?: (state: TState) => React.ReactElement<any>;
  addListener: (handler) => void;
  removeListener: (handler) => void;
  onEvent: (event) => TState;
}

export class SyncSensor<TState> extends Component<ISyncSensorProps<TState>, TState> {
  frame;
  state: TState;

  constructor (props, context) {
    super(props, context);

    this.state = props.initial || {};
  }

  componentDidMount () {
    this.props.addListener(this.onEvent);
  }

  componentWillUnmount () {
    this.props.removeListener(this.onEvent);
  }

  onEvent = (event) => {
    const state = this.props.onEvent(event);

    this.setState(state);
  };

  render () {
    return this.props.children(this.state);
  }
}
