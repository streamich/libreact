import {ViewportScrollSensor, IViewportScrollSensorProps, IViewportScrollSensorState, TRect} from '../ViewportScrollSensor';
import {noop} from '../util';

export interface IParallaxProps extends IViewportScrollSensorProps {
}

export interface IParallaxState extends IViewportScrollSensorState {
}

export class Parallax extends ViewportScrollSensor<IParallaxProps, IParallaxState> {
  onCalculation (visible, rectRoot: TRect, rectEl: TRect, rectIntersection: TRect) {
    if (visible !== this.state.visible) {
      const state = {
        visible
      };

      this.setState(state);
      (this.props.onChange || noop)(state);
    }
  }
}
