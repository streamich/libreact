import {Component, createElement as h} from 'react';
import SizeSensor, {ISizeSensorProps, ISizeSensorState} from '../SizeSensor';

export interface IWidthSensorProps extends ISizeSensorProps {
  onWidth: () => void;
}

class WidthSensor extends Component<IWidthSensorProps, ISizeSensorState> {
  state: ISizeSensorState = {
    width: null,
    height: null,
  };

  onSize = (size) => {
    if (this.state.width !== size.width) {
      this.setState(size);
    }
  };

  render () {
    const {children, ..._rest} = this.props;
    const rest: ISizeSensorProps = _rest;

    rest.onSize = this.onSize;

    return h(SizeSensor, rest,
      typeof children === 'function' ? children(this.state) : children
    );
  }
}

export default WidthSensor;
