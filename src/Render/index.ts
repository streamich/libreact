import {Component} from 'react';
import {render, createEnhancer} from 'react-universal-interface';
import {h} from '../util';

export interface IRenderProps {
  delay?: number;
  duration?: number;
  fps?: number;
}

export interface IRenderState {
  start?: number;
  time?: number;
  value?: number;
}

export class Render extends Component<IRenderProps, IRenderState> {
  frame = null;

  start () {
    const time = Date.now();

    this.setState({
      start: time,
      time,
      value: 0
    }, () => {
      this.frame = requestAnimationFrame(this.onFrame);
    });
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.frame);
  }

  onFrame = () => {
    const time = Date.now();
    const value = Math.min((time - this.state.start) / this.props.duration, 1);
    let onState;

    if (value < 1) {
      onState = () => {
        this.frame = requestAnimationFrame(this.onFrame);
      };
    }

    this.setState({
      time,
      value
    }, onState);
  };

  render () {
    return render(this.props, this.state);
  }
}

export const withRender = createEnhancer(Render, 'render');
