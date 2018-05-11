import {Component, createElement as h} from 'react';
import {WindowSizeSensor, IWindowSizeSensorProps, IWindowSizeSensorValue} from '../WindowSizeSensor';
import {noop} from '../util';
import faccToHoc from '../util/faccToHoc';

export interface IWindowWidthSensorProps extends IWindowSizeSensorProps {
  onChange?: (size: IWindowSizeSensorValue) => void;
}

export class WindowWidthSensor extends Component<IWindowWidthSensorProps, IWindowSizeSensorValue> {
  static defaultProps = {
    onChange: noop
  };

  state = {
    width: Infinity,
    height: Infinity,
  };

  onChange = (size) => {
    if (this.state.width !== size.width) {
      this.setState(size);
      this.props.onChange(size);
    }
  };

  render () {
    const {onChange, ..._rest} = this.props;
    const rest: IWindowSizeSensorProps = _rest;

    rest.onChange = this.onChange;

    return h(WindowSizeSensor, rest);
  }
}

export const withWindowWidth = faccToHoc(WindowWidthSensor, 'windowWidth');
