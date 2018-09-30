import {Component} from 'react';
import {isClient} from '../util';
import faccToHoc from '../util/faccToHoc';
import renderProp from '../util/renderProp';
import {IUniversalInterfaceProps} from '../typing'
import {noop, on, off} from '../util';
import {throttle} from 'throttle-debounce';

export interface IWindowWidthSensorProps extends IUniversalInterfaceProps<IWindowWidthSensorState> {
  width?: number,
  throttle?: number,
  onWidth: (state: IWindowWidthSensorState) => {},
}

export interface IWindowWidthSensorState {
  width: number;
}

export class WindowWidthSensor extends Component<IWindowWidthSensorProps, IWindowWidthSensorState> {
  static defaultProps = {
    width: 1920,
    throttle: 25,
    onWidth: noop,
  };

  state = {
    width: isClient ? window.innerWidth : this.props.width,
  };

  componentDidMount () {
    on(window, 'resize', this.onResize);
  }

  componentWillUnmount () {
    off(window, 'resize', this.onResize);
  }

  onResize = throttle(this.props.throttle, false, () => {
    const width = window.innerWidth;

    if (width !== this.state.width) {
      const state = {width};

      this.setState(state);
      this.props.onWidth(state);
    }
  });

  render () {
    return renderProp(this.props, this.state);
  }
}

export const withWindowWidth = faccToHoc(WindowWidthSensor, 'windowWidth');
