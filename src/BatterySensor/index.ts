import {Component} from 'react';
import {on, off} from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';

export interface IBatterySensorProps {
  children?: (INetworkState) => React.ReactElement<any>;
  render?: (INetworkState) => React.ReactElement<any>;
}

export interface IBatterySensorState {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

export class BatterySensor extends Component<IBatterySensorProps, IBatterySensorState> {
  state: IBatterySensorState;
  mounted: boolean;
  battery;

  componentDidMount () {
    this.mounted = true;

    (navigator as any).getBattery().then((battery) => {
      if (this.mounted) {
        this.battery = battery;
        this.onBattery();
      }
    });
  }

  componentWillUnmount () {
    this.mounted = false;

    const {battery, onChange} = this;

    if (battery) {
      off(battery, 'chargingchange', onChange);
      off(battery, 'levelchange', onChange);
      off(battery, 'chargingtimechange', onChange);
      off(battery, 'dischargingtimechange', onChange);
    }
  }

  onBattery () {
    const {battery, onChange} = this;

    this.onChange();

    on(battery, 'chargingchange', onChange);
    on(battery, 'levelchange', onChange);
    on(battery, 'chargingtimechange', onChange);
    on(battery, 'dischargingtimechange', onChange);
  }

  onChange = () => {
    const {battery} = this;
    const {charging, level, chargingTime, dischargingTime} = battery;

    this.setState({
      charging,
      level,
      chargingTime,
      dischargingTime
    });
  };

  render () {
    return renderProp(this.props, this.state);
  }
}

export const withBattery = faccToHoc(BatterySensor, 'battery');
