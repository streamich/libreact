import { Component } from 'react';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';
export class GeoLocationSensor extends Component {
    constructor() {
        super(...arguments);
        this.mounted = false;
        this.watchId = 0;
        this.state = {
            accuracy: null,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: null,
            longitude: null,
            speed: null,
            timestamp: Date.now()
        };
        this.onEvent = (event) => {
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
    }
    componentDidMount() {
        this.mounted = true;
        navigator.geolocation.getCurrentPosition(this.onEvent);
        this.watchId = navigator.geolocation.watchPosition(this.onEvent);
    }
    componentWillUnmount() {
        this.mounted = false;
        navigator.geolocation.clearWatch(this.watchId);
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
export const withGeoLocation = faccToHoc(GeoLocationSensor, 'geoLocation');
