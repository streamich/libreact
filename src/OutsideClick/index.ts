import * as React from 'react';
import {on, off, noop} from '../util';

export interface IOutsideClickProps {
  event?: string;
  onClick?: (event?) => void;
  clickRoots?: () => Array<HTMLElement>;
}

export interface IOutsideClickState {
}

export class OutsideClick extends React.Component<IOutsideClickProps, IOutsideClickState> {
  static defaultProps = {
    event: 'mousedown'
  };

  roots: Array<HTMLElement>;

  ref = (originalRef) => (el) => {
    const { clickRoots } = this.props
    this.roots = clickRoots
      ? clickRoots()
      : [el];
    (originalRef || noop)(el);
  };

  componentDidMount () {
    on(document, this.props.event, this.onClickOutside);
  }

  componentWillUnmount () {
    off(document, this.props.event, this.onClickOutside);
  }

  onClickOutside = (event) => {
    if (!this.roots.length) {
        return
    }

    const inside = this.roots.some(root => (
        root.contains(event.target)
    ))

    if (!inside) {
      (this.props.onClick || noop)(event);
    }
  };

  render () {
    const {children} = this.props;
    const element = React.Children.only(children);

    if (!element) {
      return null;
    }

    return React.cloneElement(element, {
      ...element.props,
      ref: this.ref((element as any).ref)
    });
  }
}
