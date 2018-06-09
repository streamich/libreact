import {Component} from 'react';
import {on, off, isClient, noop} from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
import {IUniversalInterfaceProps} from '../typing';

const patchHistoryMethod = (method) => {
  const original = history[method];

  history[method] = function (state) {
    const result = original.apply(this, arguments);
    const event = new Event(method.toLowerCase());

    (event as any).state = state;

    window.dispatchEvent(event);

    return result;
  };
};

if (isClient) {
  patchHistoryMethod('pushState');
  patchHistoryMethod('replaceState');
}

export interface ILocationSensorProps extends IUniversalInterfaceProps<ILocationSensorState> {
  onChange?: (state: ILocationSensorState) => void;
}

export interface ILocationSensorState {
  trigger: string;
  state?: any;
  length?: number;
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
}

export class LocationSensor extends Component<ILocationSensorProps, ILocationSensorState> {
  state: ILocationSensorState;

  constructor (props, context) {
    super(props, context);

    if (isClient) {
      this.state = this.buildState('load');
    } else {
      this.state = {
        trigger: 'load',
        length: 1
      };
    }
  }

  componentDidMount () {
    on(window, 'popstate', this.onPopstate);
    on(window, 'pushstate', this.onPushstate);
    on(window, 'replacestate', this.onReplacestate);
  }

  componentWillUnmount () {
    off(window, 'popstate', this.onPopstate);
    off(window, 'pushstate', this.onPushstate);
    off(window, 'replacestate', this.onReplacestate);
  }

  onPopstate = () => {
    this.onChange('popstate');
  };

  onPushstate = () => {
    this.onChange('pushstate');
  };

  onReplacestate = () => {
    this.onChange('replacestate');
  };

  onChange = (trigger: string) => {
    const newState = this.buildState(trigger);

    this.setState(newState);
    (this.props.onChange || noop)(newState);
  };

  buildState (trigger: string) {
    const {
      state,
      length
    } = history;

    const {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    } = location;

    return {
      trigger,
      state,
      length,
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    };
  }

  render () {
    return renderProp(this.props, this.state);
  }
}

export const withLocation = faccToHoc(LocationSensor, 'location');
