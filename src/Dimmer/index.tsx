import {Component} from 'react';
import {h} from '../util';
import {render} from 'react-universal-interface';

export interface IDimmerProps {
  blur?: number;
  color?: string;
  hidden?: boolean;
}

export interface IDimmerState {
}

export class Dimmer extends Component<IDimmerProps, IDimmerState> {
  static defaultProps = {
    blur: 5,
    color: 'rgba(0,0,0,0.5)',
  };

  state: IDimmerState = {

  };

  blur () {

  }

  unblur () {

  }

  render () {
    return h('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2147483647, // Max z-index.
      }
    },
      render(this.props, this.state)
    );
  }
}
