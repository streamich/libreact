import {Component} from 'react';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IGeoLocationSensorProps {
  children?: (state: IGeoLocationSensorState) => React.ReactElement<any>;
  render?: (state: IGeoLocationSensorState) => React.ReactElement<any>;
}

export interface IGeoLocationSensorState {
  accuracy: number,
  altitude: number,
  altitudeAccuracy: number,
  heading: number,
  latitude: number,
  longitude: number,
  speed: number,
  timestamp: number
}

export class GeoLocationSensor extends Component<IGeoLocationSensorProps, IGeoLocationSensorState> {
  mounted = false;
  watchId: number = 0;

  state: IGeoLocationSensorState = {
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now()
  };

  componentDidMount () {
    this.mounted = true;

    navigator.geolocation.getCurrentPosition(this.onEvent);
    this.watchId = navigator.geolocation.watchPosition(this.onEvent);
  }

  componentWillUnmount () {
    this.mounted = false;

    navigator.geolocation.clearWatch(this.watchId);
  }

  onEvent = (event) => {
    if (this.mounted) {
      this.setState({
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp
      });
    }
  };

  render () {
    return renderProp(this.props, this.state);
  }
}

export const withGeoLocation = faccToHoc(GeoLocationSensor, 'geoLocation');
