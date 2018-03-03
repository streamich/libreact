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

  el: HTMLElement = null;

  state: IDimmerState = {

  };

  ref = (el) => {
    this.el = el;
  };

  componentDidMount () {
    const parent = this.el.parentElement;

    this.applyDOMChanges();
  }

  componentWillUnmount () {
    this.removeDOMChanges();
  }

  applyDOMChanges () {
    const parent = this.el.parentElement;
    const siblings = Array.from(document.body.children);
    const position = parent.style.getPropertyValue('position');

    if (process.env.NODE_ENV !== 'production') {
      if (position && (position !== 'relative')) {
        console.warn(
          'The "position" style property of a parent element of <Dimmer> must be ' +
          `"relative" or not set, but "${position}" was detected. It will be overwritten` +
          'to "relative".'
        );
      }
    }

    if (position !== 'relative') {
      parent.style.setProperty('position', 'relative', 'important');
    }

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];

      if (sibling === this.el) {
        continue;
      }


    }
  }

  removeDOMChanges () {

  }

  render () {
    return h('div', {
      ref: this.ref,
      style: {
        background: this.props.color,
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
