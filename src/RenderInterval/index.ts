import {Component} from 'react';
import {render, createEnhancer} from 'react-universal-interface';
import {h} from '../util';

export interface IRenderIntervalProps {
  fps?: number;
  ms?: number;
}

export interface IRenderIntervalState {
  start?: number;
  now?: number;
  value?: number;
}

export class RenderInterval extends Component<IRenderIntervalProps, IRenderIntervalState> {
  static defaultProps = {
    fps: 30,
    ms: 300
  };

  delay: number = 50;
  timeout = null;

  state = {
    start: 0,
    now: 0,
    value: 0
  };

  componentDidMount () {
    const now = Date.now();

    this.delay = 1000 / this.props.fps;

    this.setState({
      start: now,
      now,
      value: 0
    }, () => {
      this.timeout = setTimeout(this.onFrame, this.delay);
    });
  }

  componentDidUpdate (props) {
    if (props.fps !== this.props.fps) {
      this.delay = 1000 / this.props.fps;
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout);
  }

  onFrame = () => {
    const now = Date.now();
    const value = Math.min((now - this.state.start) / this.props.ms, 1);
    let onState;

    if (value < 1) {
      onState = () => {
        this.timeout = setTimeout(this.onFrame, this.delay);
      };
    }

    this.setState({
      now,
      value
    }, onState);
  };

  render () {
    return render(this.props, this.state);
  }
}

export const withRenderInterval = createEnhancer(RenderInterval, 'renderInterval');
