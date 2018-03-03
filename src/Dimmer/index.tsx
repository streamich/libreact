import {Component} from 'react';
import {h} from '../util';
import {render} from 'react-universal-interface';

export interface IDimmerProps {
  color?: string;
  ms?: number;
  hidden?: boolean;
}

export class Dimmer extends Component<IDimmerProps, {}> {
  static defaultProps = {
    color: 'rgba(0,0,0,0.5)',
    ms: 300,
  };

  el: HTMLElement = null;

  ref = (el) => {
    this.el = el;
  };

  componentDidMount () {
    const parent = this.el.parentElement;
    const position = parent.style.getPropertyValue('position');

    if (process.env.NODE_ENV !== 'production') {
      if (position && (position !== 'relative')) {
        console.warn(
          'The "position" style property of a parent element of <Dimmer> must be ' +
          `"relative" or not set, but "${position}" was detected. It will be overwritten ` +
          'to "relative".'
        );
      }
    }

    if (position !== 'relative') {
      parent.style.setProperty('position', 'relative', 'important');
    }
  }

  render () {
    const {hidden} = this.props;

    let style: any = {
      background: this.props.color,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 2147483647, // Max z-index.
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: `opacity ${this.props.ms}ms`,
    };

    if (hidden) {
      style.opacity = 0;
      style.pointerEvents = 'none';
    }

    return h('div', {
      ref: this.ref,
      style,
    },
      hidden ? null : render(this.props, this.state)
    );
  }
}
