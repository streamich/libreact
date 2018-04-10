import {Component} from 'react';

export interface IVibrateProps {
  ms: number | number[];
}

export class Vibrate extends Component<IVibrateProps, any> {
  componentDidMount () {
    this.vibrate();
  }

  componentDidUpdate (props) {
    if (String(props.ms) !== String(this.props.ms)) {
      this.vibrate();
    }
  }

  vibrate () {
    if (navigator.vibrate) {
      navigator.vibrate(this.props.ms);
    }
  }

  render () {
    return null;
  }
}
