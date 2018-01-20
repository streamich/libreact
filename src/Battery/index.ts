import {Component} from 'react';
import {on, off, isClient} from '../util';

export interface IBatteryProps {
  children?: (INetworkState) => React.ReactElement<any>;
}

export interface IBatteryState {
  charging: boolean;
  level: number;
}

export class Battery extends Component<IBatteryProps, IBatteryState> {
  state: IBatteryState;
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

    const {battery} = this;

    if (battery) {
      off(battery, 'chargingchange', this.onChange);
      off(battery, 'levelchange', this.onChange);
    }
  }

  onBattery () {
    const {battery} = this;

    this.onChange();

    on(battery, 'chargingchange', this.onChange);
    on(battery, 'levelchange', this.onChange);
  }

  onChange = () => {
    const {battery} = this;
    const {charging, level} = battery;

    this.setState({
      charging,
      level
    });
  };

  render () {
    return this.props.children(this.state);
  }
}
