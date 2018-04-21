import {ViewportScrollSensor, IViewportScrollSensorProps, IViewportScrollSensorState, TRect} from '../ViewportScrollSensor';
import {noop} from '../util';

export interface IParallaxProps extends IViewportScrollSensorProps {
}

export interface IParallaxState extends IViewportScrollSensorState {
}

export class Parallax extends ViewportScrollSensor<IParallaxProps, IParallaxState> {
  update (visible, rectRoot: TRect, rectEl: TRect, rectIntersection: TRect) {
    const state = {
      visible,
      rectRoot,
      rectEl,
      rectIntersection,
    };

    this.setState(state);
    (this.props.onChange || noop)(state);
  }

  onCalculation (visible, rectRoot: TRect, rectEl: TRect, rectIntersection: TRect) {
    if (visible) {
      this.update(visible, rectRoot, rectEl, rectIntersection);
    } else {
      if (this.state.visible) {
        this.update(visible, rectRoot, rectEl, rectIntersection);
      }
    }
  }
}
