import {Component} from 'react';
import {SyncSensor} from '../SyncSensor';
import {h, on, off, isClient} from '../util';
import faccToHoc from '../util/faccToHoc';

export interface IGeoLocationSensorProps {
  children?: (state: IGeoLocationSensorState) => React.ReactElement<any>;
}

export interface IGeoLocationSensorState {

}

const DEFAULT = {

};

const addListener = (handler) => navigator.geolocation.watchPosition(handler);
const removeListener = (handler) => navigator.geolocation.clearWatch(handler);
const onEvent = (event) => {
  console.log('event', event);

};

const getInitialState = () => {
  return DEFAULT;
};

export class GeoLocationSensor extends Component<IGeoLocationSensorProps, any> {
  initial = getInitialState();

  render () {
    return h(SyncSensor, {
      children: this.props.children,
      initial: this.initial,
      addListener,
      removeListener,
      onEvent
    });
  }
}

export const withMotion= faccToHoc(GeoLocationSensor, 'geolocation');
