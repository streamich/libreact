import {Component} from 'react';
import {h, on, off, isClient} from '../util';

const patchHistoryMethod = (method) => {
  const original = history[method];

  history[method] = function (state, title, url) {
    const result = original.apply(this, arguments);
    const event = new Event(method.toLowerCase());

    (event as any).state = state;
    // (event as any).title = title;
    // (event as any).url = url;

    window.dispatchEvent(event);

    return result;
  };
};

if (isClient) {
  patchHistoryMethod('pushState');
  patchHistoryMethod('replaceState');
}

export interface ILocationSensorProps {
  children?: (ILocationSensorState) => React.ReactElement<any>;
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

  onPopstate = (e) => {
    this.onChange('popstate');
  };

  onPushstate = (e) => {
    this.onChange('pushstate');
  };

  onReplacestate = (e) => {
    this.onChange('replacestaet');
  };

  onChange = (trigger: string) => {
    this.setState(this.buildState(trigger));
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
    return this.props.children(this.state);
  }
}
