import {Component} from 'react';

declare const AmbientLightSensor;

export interface ILightSensorProps {
  children?: (state: ILightSensorState) => React.ReactElement<any>;
}

export interface ILightSensorState {
  illuminance: number;
  error?: {
    name: string;
    message: string;
  }
}

export class LightSensor extends Component<ILightSensorProps, ILightSensorState> {
  sensor;

  state: ILightSensorState = {
    illuminance: NaN
  };

  componentDidMount () {
    if ((window as any).AmbientLightSensor) {
      this.sensor = new AmbientLightSensor();

      this.sensor.onreading = this.onChange;
      this.sensor.onerror = this.onError;

      this.sensor.start();
    }
  }

  onChange = () => {
    const {illuminance} = this.sensor;

    this.setState({
      illuminance
    });
  };

  onError = (event) => {
    const {name, message} = event;

    this.setState({
      error: {
        name,
        message
      }
    });
  };

  render () {
    return this.props.children(this.state);
  }
}
