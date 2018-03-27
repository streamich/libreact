import {Component, cloneElement, Children} from 'react';
import {on, off, noop} from '../util';

export interface IOutsideClickProps {
  onClick?: (event?) => void;
}

export interface IOutsideClickState {
}

class OutsideClick extends Component<IOutsideClickProps, IOutsideClickState> {
  el: HTMLElement;

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  componentDidMount () {
    on(document, 'mousedown', this.onClickOutside);
  }

  componentWillUnmount () {
    off(document, 'mousedown', this.onClickOutside);
  }

  onClickOutside = (event) => {
    if (this.el && !this.el.contains(event.target)) {
      (this.props.onClick || noop)(event);
    }
  };

  render () {
    const {children} = this.props;
    const element = Children.only(children);

    if (!element) {
      return null;
    }

    return cloneElement(element, {
      ...element.props,
      ref: this.ref((element as any).ref)
    });
  }
}
