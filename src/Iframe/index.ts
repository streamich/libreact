import * as React from 'react';
import {createPortal} from 'react-dom';
import {h, isClient, noop} from '../util';

export interface IIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  children?: React.ReactNode;
  onContentDocument?: (document: Document) => void;
  onElement?: (iframe: HTMLIFrameElement) => void;
}

export interface IIframeState {
  mountNode: HTMLElement;
}

export class Iframe extends React.Component<IIframeProps, IIframeState> {
  iframe: HTMLIFrameElement = null;

  state: IIframeState = {
    mountNode: null
  };

  componentDidMount () {
    this.updateMountNode();
  }

  componentWillUnmount () {
    this.iframe = null;
  }

  getMountNode (): HTMLElement {
    if (!isClient || !this.iframe) {
      return null;
    }

    try {
      const document = this.iframe.contentDocument || (this.iframe.contentWindow && this.iframe.contentWindow.document);

      return document ? (document.body || document.documentElement) : null;
    } catch (error) {
      return null;
    }
  }

  updateMountNode () {
    const mountNode = this.getMountNode();

    if (mountNode === this.state.mountNode) {
      return;
    }

    if (mountNode) {
      (this.props.onContentDocument || noop)(mountNode.ownerDocument);
    }

    this.setState({
      mountNode
    });
  }

  onElement = (iframe) => {
    this.iframe = iframe;

    if (iframe) {
      (this.props.onElement || noop)(iframe);
    }
  };

  onLoad = (event) => {
    this.updateMountNode();
    (this.props.onLoad || noop)(event);
  };

  render () {
    const {children, onContentDocument, onElement, onLoad, ...props} = this.props;

    return h(React.Fragment, null,
      this.state.mountNode ? createPortal(children, this.state.mountNode) : null,
      h('iframe', {
        ...props,
        onLoad: this.onLoad,
        ref: this.onElement
      })
    );
  }
}
