import {Component} from 'react';
import {render} from 'react-universal-interface';
import {h, isClient, on, off, noop} from '../util';
import {Overlay} from '../Overlay';

let cnt = 0;
let id = 0;

const ESC = 27;

export interface IModalProps {
  onElement?: (el: HTMLDivElement) => void;
  onEsc?: (event) => void;
}

export interface IModalState {
}

class Modal extends Component<IModalProps, IModalState> {
  id: number;
  el: HTMLElement = null;
  activeEl: Element; // Previous active element;

  constructor (props, context) {
    super(props, context);

    cnt++;
    this.id = id++;

    this.state = {
      bindTitle: {
        id: 'dialog-title-' + this.id
      },
      bindDescr: {
        id: 'dialog-descr-' + this.id
      }
    };

    this.activeEl = isClient ? document.activeElement : null;
  }

  componentDidMount () {
    on(document, 'keydown', this.onKey);

    setTimeout(() => {
      const firstFocusableElement = this.el.querySelector('button, [href], input, select, textarea, [tabindex]:not(tabindex="-1"]') as HTMLElement;

      if (firstFocusableElement && firstFocusableElement.focus) {
        firstFocusableElement.focus();
      }
    });
  }

  componentWillUnmount () {
    cnt--;

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
    return h(Overlay, {
      onElement: this.onElement
    }, render(this.props, this.state));
  }
}
