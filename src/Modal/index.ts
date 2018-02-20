import {Component} from 'react';
import {render} from 'react-universal-interface';
import FocusLock from 'react-focus-lock';
import {h, isClient, on, off, noop} from '../util';
import {Overlay, IOverlayProps} from '../Overlay';

let id = 0;

const ESC = 27;

export interface IModalProps extends IOverlayProps {
  onEsc?: (event: KeyboardEvent) => void;
}

export interface IModalState {
  idTitle: string;
  idDescription: string;
}

export class Modal extends Component<IModalProps, IModalState> {
  id: number;
  el: HTMLElement = null;
  activeEl: Element; // Previous active element;

  constructor (props, context) {
    super(props, context);

    this.id = id++;

    this.state = {
      idTitle: 'dialog-title-' + this.id,
      idDescription: 'dialog-descr-' + this.id
    };

    this.activeEl = isClient ? document.activeElement : null;
  }

  componentDidMount () {
    on(document, 'keydown', this.onKey);
  }

  componentWillUnmount () {
    off(document, 'keydown', this.onKey);

    const siblings = Array.from(document.body.children);

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i] as HTMLElement;

      if (sibling === this.el) {
        continue;
      }

      if ((sibling as any).__modal_lock !== this) {
        continue;
      }

      delete (sibling as any).__modal_lock;
      (sibling as any).inert = false;
      sibling.style.removeProperty('pointer-events');
      sibling.style.removeProperty('user-select');
      sibling.removeAttribute('aria-hidden');
    }

    // Focus previously active element.
    if (this.activeEl && (this.activeEl as any).focus) {
      (this.activeEl as any).focus();
    }
  }

  onElement = (el) => {
    this.el = el;

    el.setAttribute('role', 'dialog');
    el.classList.add('dialog');

    el.setAttribute('aria-labelledby', 'dialog-title-' + this.id);
    el.setAttribute('aria-describedby', 'dialog-descr-' + this.id);

    const siblings = Array.from(document.body.children);

    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i] as HTMLElement;

      if (sibling === el) {
        continue;
      }

      if ((sibling as any).__modal_lock) {
        continue;
      }

      (sibling as any).__modal_lock = this;
      (sibling as any).inert = true;
      sibling.style.setProperty('pointer-events', 'none');
      sibling.style.setProperty('user-select', 'none');
      sibling.setAttribute('aria-hidden', 'true');
    }

    (this.props.onElement || noop)(el);
  };

  onKey = (event) => {
    if (event.keyCode === ESC) {
      (this.props.onEsc || noop)(event);
    }
  };

  render () {
    const {color, time, onClick} = this.props;

    return h(Overlay, {
      color,
      time,
      onClick,
      onElement: this.onElement,
    },
      h(FocusLock, null,
        render(this.props, this.state)
      )
    );
  }
}
