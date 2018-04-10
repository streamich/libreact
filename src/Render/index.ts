import {Component} from 'react';
import {render, createEnhancer} from 'react-universal-interface';

export interface IRenderProps {
  delay?: number;
  ms?: number;
}

export interface IRenderState {
  start?: number;
  now?: number;
  value?: number;
}

export class Render extends Component<IRenderProps, IRenderState> {
  static defaultProps = {
    ms: 300
  };

  timeout = null;
  frame = null;

  state = {
    start: 0,
    now: 0,
    value: 0
  };

  componentDidMount () {
    const {delay} = this.props;

    if (delay) {
      this.timeout = setTimeout(this.start, delay);
    } else {
      this.start();
    }
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.frame);
    clearTimeout(this.timeout);
  }

  start = () => {
    const now = Date.now();

    this.setState({
      start: now,
      now,
      value: 0
    }, () => {
      this.frame = requestAnimationFrame(this.onFrame);
    });
  }

  onFrame = () => {
    const now = Date.now();
    const value = Math.min((now - this.state.start) / this.props.ms, 1);
    let onState;

    if (value < 1) {
      onState = () => {
        this.frame = requestAnimationFrame(this.onFrame);
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

export const withRender = createEnhancer(Render, 'render');
