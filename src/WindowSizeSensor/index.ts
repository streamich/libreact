import {Component, createElement as h} from 'react';
import {SyncSensor} from '../SyncSensor';
import {isClient} from '../util';
import faccToHoc from '../util/faccToHoc';

export interface IWindowSizeSensorValue {
  width: number;
  height: number;
}

export interface IWindowSizeSensorProps {
  children?: (state: IWindowSizeSensorValue) => React.ReactElement<any>;
  onChange?: (state: IWindowSizeSensorValue) => void;
}

const addListener = (handler) => window.addEventListener('resize', handler);
const removeListener = (handler) => window.removeEventListener('resize', handler);
const onEvent = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

const getInitialState = () => {
  if (isClient) {
    return onEvent();
  } else {
    return {
      width: 1920,
      height: 1080
    };
  }
};

export class WindowSizeSensor extends Component<IWindowSizeSensorProps, any> {
  initial = getInitialState();

  render () {
    return h(SyncSensor, {
      children: this.props.children,
      initial: this.initial,
      addListener,
      removeListener,
      onChange: this.props.onChange,
      onEvent
    });
  }
}

export const withWindowSize = faccToHoc(WindowSizeSensor, 'windowSize');
