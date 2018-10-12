import * as React from 'react';
import {noop} from '../util';
import renderProp from '../util/renderProp';
import {throttle} from 'throttle-debounce';
import {IUniversalInterfaceProps} from '../typing';

export interface ISyncSensorProps<TState> extends IUniversalInterfaceProps<TState> {
  throttle?: number;
  initial?: TState;
  addListener: (handler) => void;
  removeListener: (handler) => void;
  onChange: (state: TState) => void;
  onEvent: (event) => TState;
}

export class SyncSensor<TState> extends React.Component<ISyncSensorProps<TState>, TState> {
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

      this.setState(state, () => {
        (this.props.onChange || noop)(this.state);
      });
    });
  }

  componentDidMount () {
    this.props.addListener(this.onEvent);
  }

  componentWillUnmount () {
    this.props.removeListener(this.onEvent);
  }

  render () {
    return renderProp(this.props, this.state);
  }
}
