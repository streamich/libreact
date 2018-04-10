import {Component} from 'react';
import {SyncSensor} from '../SyncSensor';
import {h, on, off} from '../util';
import faccToHoc from '../util/faccToHoc';

export interface IMotionSensorProps {
  children?: (state: IMotionSensorState) => React.ReactElement<any>;
}

export interface IMotionSensorState {
  acceleration: {
    x: number,
    y: number,
    z: number
  },
  accelerationIncludingGravity: {
    x: number,
    y: number,
    z: number
  },
  rotationRate: {
    alpha: number,
    beta: number,
    gamma: number
  },
  interval: number
}

const DEFAULT = {
  acceleration: {
    x: null,
    y: null,
    z: null
  },
  accelerationIncludingGravity: {
    x: null,
    y: null,
    z: null
  },
  rotationRate: {
    alpha: null,
    beta: null,
    gamma: null
  },
  interval: 16
};

const addListener = (handler) => on(window, 'devicemotion', handler);
const removeListener = (handler) => off(window, 'devicemotion', handler);
const onEvent = (event) => {
  const {
    acceleration,
    accelerationIncludingGravity,
    rotationRate,
    interval
  } = event;

  return {
    acceleration: {
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z
    },
    accelerationIncludingGravity: {
      x: accelerationIncludingGravity.x,
      y: accelerationIncludingGravity.y,
      z: accelerationIncludingGravity.z
    },
    rotationRate: {
      alpha: rotationRate.alpha,
      beta: rotationRate.beta,
      gamma: rotationRate.gamma,
    },
    interval
  };
};

const getInitialState = () => {
  return DEFAULT;
};

export class MotionSensor extends Component<IMotionSensorProps, any> {
  initial = getInitialState();

  render () {
    return h(SyncSensor, {
      children: this.props.children,
      initial: this.initial,
      addListener,
      removeListener,
      onEvent
    });
  }
}

export const withMotion = faccToHoc(MotionSensor, 'motion');
