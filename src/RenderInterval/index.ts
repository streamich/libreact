import {Component} from 'react';
import {render, createEnhancer} from 'react-universal-interface';
import {IRenderProps, IRenderState} from '../Render';

export interface IRenderIntervalProps extends IRenderProps {
  fps?: number;
}

export interface IRenderIntervalState extends IRenderState {
}

export class RenderInterval extends Component<IRenderIntervalProps, IRenderIntervalState> {
  static defaultProps = {
    fps: 30,
    ms: 300
  };

  interval: number = 50;
  timeout = null;
  timeoutDelay = null;

  state = {
    start: 0,
    now: 0,
    value: 0
  };

  componentDidMount () {
    const {delay} = this.props;

    if (delay) {
      this.timeoutDelay = setTimeout(this.start, delay);
    } else {
      this.start();
    }
  }

  start = () => {
    const now = Date.now();

    this.interval = 1000 / this.props.fps;

    this.setState({
      start: now,
      now,
      value: 0
    }, () => {
      this.timeout = setTimeout(this.onFrame, this.interval);
    });
  }

  componentDidUpdate (props) {
    if (props.fps !== this.props.fps) {
      this.interval = 1000 / this.props.fps;
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout);
    clearTimeout(this.timeoutDelay);
  }

  onFrame = () => {
    const now = Date.now();
    const value = Math.min((now - this.state.start) / this.props.ms, 1);
    let onState;

    if (value < 1) {
      onState = () => {
        this.timeout = setTimeout(this.onFrame, this.interval);
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
