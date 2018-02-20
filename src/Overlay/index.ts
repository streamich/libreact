import {Component} from 'react';
import {Portal} from '../Portal';
import {h, noop, on, off} from '../util';

export interface IOverlayProps {
  color?: string;
  time?: number;
  onClick?: (event: MouseEvent) => void;
  onElement?: (div: HTMLElement) => void;
}

export interface IOverlayState {
}

export class Overlay extends Component<IOverlayProps, IOverlayState> {
  el: HTMLElement = null;

  static defaultProps = {
    color: 'rgba(0,0,0,0.5)',
    time: 300,
  };

  componentWillUnmount () {
    off(this.el, 'click', this.onClick);
  }

  onElement = (el) => {
    const {style} = el;

    this.el = el;

    style.zIndex = 2147483647; // Max z-index.
    style.position = 'fixed';
    style.width = '100%';
    style.height = '100%';
    style.top = 0;
    style.left = 0;
    style.right = 0;
    style.bottom = 0;
    style.background = this.props.color;
    style.transition = this.props.time + 'ms opacity';
    style.opacity = 0;

    style.display = 'flex';
    style.alignItems = 'center';
    style.justifyContent = 'center';

    // After double .requestAnimationFrame
    setTimeout(() => {
      style.opacity = 1;
    }, 35);

    on(el, 'click', this.onClick);

    (this.props.onElement || noop)(el);
  };

  onClick = (event) => {
    if (event.target === this.el) {
      (this.props.onClick || noop)(event);
    }
  };

  render () {
    return h(Portal, {onElement: this.onElement}, this.props.children);
  }
}
