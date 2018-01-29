import { Component } from 'react';
import { on, off, noop } from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
export class MediaDeviceSensor extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            devices: []
        };
        this.mounted = false;
        this.onChange = () => {
            navigator.mediaDevices.enumerateDevices()
                .then((devices) => {
                if (this.mounted) {
                    this.setState({
                        devices: devices.map(({ deviceId, groupId, kind, label }) => ({ deviceId, groupId, kind, label }))
                    });
                }
            })
                .catch(noop);
        };
    }
    componentDidMount() {
        this.mounted = true;
        this.onChange();
        on(navigator.mediaDevices, 'devicechange', this.onChange);
    }
    componentWillUnmount() {
        this.mounted = false;
        off(navigator.mediaDevices, 'devicechange', this.onChange);
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
export const withMediaDevices = faccToHoc(MediaDeviceSensor);
