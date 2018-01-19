import {Component, createElement as h} from 'react';
import {SyncSensor} from '../SyncSensor';

export interface IWindowSizeSensorValue {
  width: number;
  height: number;
}

export interface IWindowSizeSensorProps {
  children?: (state: IWindowSizeSensorValue) => React.ReactElement<any>;
}

export class WindowSizeSensor extends Component<IWindowSizeSensorProps, any> {
  addListener = (handler) => window.addEventListener('resize', handler);
  removeListener = (handler) => window.removeEventListener('resize', handler);

  onEvent = () => ({
    width: window.innerWidth,
    height: window.innerHeight
  });

  render () {
    return h(SyncSensor, {
      children: this.props.children,
      addListener: this.addListener,
      removeListener: this.removeListener,
      onEvent: this.onEvent
    });
  }
}