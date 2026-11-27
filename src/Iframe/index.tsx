import * as React from 'react';
import {createPortal} from 'react-dom';
import {h, isClient, noop} from '../util';

export interface IIframeProps extends React.HTMLAttributes<HTMLIFrameElement> {
  children?: any;
  src?: string;
  title?: string;
  onElement?: (el: HTMLIFrameElement) => void;
  [key: string]: any;
}

export interface IIframeState {
  mountNode: HTMLElement | null;
}

export class Iframe extends React.Component<IIframeProps, IIframeState> {
  el: HTMLIFrameElement | null = null;
  state: IIframeState = {
    mountNode: null,
  };

  componentDidMount () {
    this.updateMountNode();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.src !== this.props.src) {
      this.updateMountNode();
    }
  }

  onElement = (el) => {
    this.el = el;
    this.updateMountNode();
    (this.props.onElement || noop)(el);
  };

  onLoad = (event) => {
    this.updateMountNode();
    (this.props.onLoad || noop)(event);
  };

  updateMountNode () {
    const document = this.el && this.el.contentDocument;
    const mountNode = document && document.body;

    if (mountNode && mountNode !== this.state.mountNode) {
      this.setState({mountNode});
    }
  }

  render () {
    const {children, onElement, ...rest} = this.props;
    const {mountNode} = this.state;

    return h(
      'iframe',
      {...rest, onLoad: this.onLoad, ref: this.onElement},
      isClient && mountNode ? createPortal(children, mountNode) : null
    );
  }
}
