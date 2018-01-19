import {Component, createElement as h} from 'react';
import SizeSensor, {ISizeSensorProps, ISizeSensorState} from '../SizeSensor';
import {noop} from '../util';

export interface IWidthSensorProps extends ISizeSensorProps {
  onWidth?: (size: ISizeSensorState) => void;
}

class WidthSensor extends Component<IWidthSensorProps, ISizeSensorState> {
  state: ISizeSensorState = {
    width: null,
    height: null,
  };

  onSize = (size) => {
    if (this.state.width !== size.width) {
      this.setState(size);
      (this.props.onWidth || noop)(size);
    }
  };

  render () {
    const {children, onWidth, ..._rest} = this.props;
    const rest: ISizeSensorProps = _rest;

    rest.onSize = this.onSize;

    return h(SizeSensor, rest,
      typeof children === 'function' ? children(this.state) : children
    );
  }
}

export default WidthSensor;
