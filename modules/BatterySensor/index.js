import { Component } from 'react';
import { on, off } from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
export class BatterySensor extends Component {
    constructor() {
        super(...arguments);
        this.onChange = () => {
            const { battery } = this;
            const { charging, level, chargingTime, dischargingTime } = battery;
            this.setState({
                charging,
                level,
                chargingTime,
                dischargingTime
            });
        };
    }
    componentDidMount() {
        this.mounted = true;
        navigator.getBattery().then((battery) => {
            if (this.mounted) {
                this.battery = battery;
                this.onBattery();
            }
        });
    }
    componentWillUnmount() {
        this.mounted = false;
        const { battery, onChange } = this;
        if (battery) {
            off(battery, 'chargingchange', onChange);
            off(battery, 'levelchange', onChange);
            off(battery, 'chargingtimechange', onChange);
            off(battery, 'dischargingtimechange', onChange);
        }
    }
    onBattery() {
        const { battery, onChange } = this;
        this.onChange();
        on(battery, 'chargingchange', onChange);
        on(battery, 'levelchange', onChange);
        on(battery, 'chargingtimechange', onChange);
        on(battery, 'dischargingtimechange', onChange);
    }
    render() {
        return renderProp(this.props, this.state);
    }
}
export const withBattery = faccToHoc(BatterySensor, 'battery');
