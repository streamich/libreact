import * as React from 'react';
import {createPortal} from 'react-dom';
import {isClient, noop} from '../util';

export interface IPortalProps {
  children?: any;
  el?: HTMLElement;
  onElement?: (el: HTMLElement) => void;
}

export interface IPortalState {
}

export class Portal extends React.Component<IPortalProps, IPortalState> {
  el: HTMLElement = null;

  constructor (props, context) {
    super(props, context);

    if (isClient && !props.el) {
      this.createEl();
      (props.onElement || noop)(this.el);
    }
  }

  componentWillUpdate (props) {
    if (!props.el && !this.el) {
      this.createEl();
    }
  }

  componentWillUnmount () {
    if (this.el) {
      document.body.removeChild(this.el);
    }

    this.el = null;
  }

  createEl () {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);
  }

  render () {
    if (!isClient) {
      return null;
    }

    const {el, children} = this.props;

    return createPortal(children, el || this.el);
  }
}
