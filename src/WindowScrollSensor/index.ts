import * as React from 'react';
import {SyncSensor} from '../SyncSensor';
import {isClient, h} from '../util';
import faccToHoc from '../util/faccToHoc';
import {IUniversalInterfaceProps} from '../typing';

export interface IWindowScrollSensorValue {
  x: number;
  y: number;
}

export interface IWindowScrollSensorProps extends IUniversalInterfaceProps<IWindowScrollSensorValue> {
  onChange?: (state: IWindowScrollSensorValue) => void;
}

const addListener = (handler) => window.addEventListener('scroll', handler, {
  capture: false,
  passive: true
} as any);

const removeListener = (handler) => window.removeEventListener('scroll', handler);

const onEvent = () => ({
  x: window.scrollX,
  y: window.scrollY
});

const getInitialState = () => {
  if (isClient) {
    return onEvent();
  } else {
    return {
      x: 0,
      y: 0
    };
  }
};

export class WindowScrollSensor extends React.Component<IWindowScrollSensorProps, any> {
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

export const withWindowScroll = faccToHoc(WindowScrollSensor, 'windowScroll');
