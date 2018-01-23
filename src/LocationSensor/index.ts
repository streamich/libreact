import {Component} from 'react';
import {on, off} from '../util';

const patchHistoryMethod = (method) => {
  const original = history[method];

  history[method] = function (state, title, url) {
    const result = original.apply(this, arguments);
    const event = new Event(method.toLowerCase());

    (event as any).state = state;
    (event as any).title = title;
    (event as any).url = url;

    window.dispatchEvent(event);

    return result;
  };
};

patchHistoryMethod('pushState');
patchHistoryMethod('replaceState');

export interface ILocationSensorProps {
  children?: (ILocationSensorState) => React.ReactElement<any>;
}

export interface ILocationSensorState {

}

export class LocationSensor extends Component<ILocationSensorProps, ILocationSensorState> {
  componentDidMount () {
    on(window, 'popstate', this.onPopstate);
    on(window, 'pushstate', this.onPushstate);
    on(window, 'replacestate', this.onReplacestate);
  }

  onPopstate = (e) => {
    console.log('popstate', e);
  };

  onPushstate = (e) => {
    console.log('pushstate', e);
  };

  onReplacestate = (e) => {
    console.log('replacestaet', e);
  };

  render () {
    return this.props.children(this.state);
  }
}
