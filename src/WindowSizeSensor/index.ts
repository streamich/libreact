import {Component} from 'react';
import {SyncSensor} from '../SyncSensor';
import {isClient, h} from '../util';
import faccToHoc from '../util/faccToHoc';
import {IUniversalInterfaceProps} from '../typing';

export interface IWindowSizeSensorValue {
  width: number;
  height: number;
}

export interface IWindowSizeSensorProps extends IUniversalInterfaceProps<IWindowSizeSensorValue> {
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
      ...this.props,
      initial: this.initial,
      addListener,
      removeListener,
      onEvent
    });
  }
}

export const withWindowSize = faccToHoc(WindowSizeSensor, 'windowSize');
