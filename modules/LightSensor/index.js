import { Component } from 'react';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
export class LightSensor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            illuminance: NaN
        };
        this.onChange = () => {
            const { illuminance } = this.sensor;
            this.setState({
                illuminance
            });
        };
        this.onError = (event) => {
            const { name, message } = event;
            this.setState({
                error: {
                    name,
                    message
                }
            });
        };
    }
    componentDidMount() {
        if (window.AmbientLightSensor) {
            this.sensor = new AmbientLightSensor();
            this.sensor.onreading = this.onChange;
            this.sensor.onerror = this.onError;
            this.sensor.start();
        }
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
export const withLight = faccToHoc(LightSensor);
