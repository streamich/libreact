import {Component} from 'react';
import {Portal} from '../Portal';
import {h} from '../util';

export interface IOverlayProps {
  color?: string;
}

export interface IOverlayState {
}

export class Overlay extends Component<IOverlayProps, IOverlayState> {
  static defaultProps = {
    color: 'rgba(0,0,0,0.5)'
  };

  onElement = (el) => {
    const {style} = el;

    style.zIndex = 2147483647; // Max z-index.
    style.position = 'fixed';
    style.width = '100%';
    style.height = '100%';
    style.top = 0;
    style.left = 0;
    style.right = 0;
    style.bottom = 0;
    style.background = this.props.color;
    style.transition = '0.3s opacity';
    style.opacity = 0;

    style.display = 'flex';
    style.alignItems = 'center';
    style.justifyContent = 'center';

    // After double .requestAnimationFrame
    setTimeout(() => {
      style.opacity = 1;
    }, 35);
  };

  render () {
    return h(Portal, {onElement: this.onElement}, this.props.children);
  }
}
