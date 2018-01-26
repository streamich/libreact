import {Component} from 'react';
import {on, off, noop} from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';

export interface IMediaDevice {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}

export interface IMediaDeviceSensorProps {
  children?: (state: IMediaDeviceSensorState) => React.ReactElement<any>;
  render?: (state: IMediaDeviceSensorState) => React.ReactElement<any>;
}

export interface IMediaDeviceSensorState {
  devices: IMediaDevice[];
}

export class MediaDeviceSensor extends Component<IMediaDeviceSensorProps, IMediaDeviceSensorState> {
  state: IMediaDeviceSensorState = {
    devices: []
  };
  mounted = false;

  componentDidMount () {
    this.mounted = true;
    this.onChange();

    on(navigator.mediaDevices, 'devicechange', this.onChange);
  }

  componentWillUnmount () {
    this.mounted = false;
    off(navigator.mediaDevices, 'devicechange', this.onChange);
  }

  onChange = () => {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        if (this.mounted) {
          this.setState({
            devices: devices.map(({deviceId, groupId, kind, label}) =>
              ({deviceId, groupId, kind, label})
            )
          });
        }
      })
      .catch(noop);
  };

  render () {
    return renderProp(this.props, this.state);
  }
}

export const withMediaDevices = faccToHoc(MediaDeviceSensor);
