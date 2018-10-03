import {Component} from 'react';
import {SizeSensor, ISizeSensorProps, ISizeSensorState} from '../SizeSensor';
import {noop, h} from '../util';
import faccToHoc, {divWrapper} from '../util/faccToHoc';

export interface IWidthSensorProps extends ISizeSensorProps {
  onWidth?: (size: ISizeSensorState) => void;
}

export class WidthSensor extends Component<IWidthSensorProps, ISizeSensorState> {
  static defaultProps = {
    onWidth: noop
  };

  state = {
    width: Infinity,
    height: Infinity,
  };

  onSize = (size) => {
    if (this.state.width !== size.width) {
      this.setState(size);
      this.props.onWidth(size);
    }
  };

  render () {
    const {onWidth, ..._rest} = this.props;
    const rest: ISizeSensorProps = _rest;

    rest.onSize = this.onSize;

    return h(SizeSensor, rest);
  }
}

export const withWidth = faccToHoc(WidthSensor, 'width', divWrapper);
