import * as React from 'react';
import {rule, keyframes} from '../nano';
import {h, noop} from '../util';

const rippleAnimationName = keyframes({
  to: {
     transform: 'scale(12)',
     opacity: 0
  }
});

const className = rule({
  borderRadius: '50%',
  height: '100px',
  width: '100px',
  position: 'absolute',
  transform: 'scale(0)',
  opacity: 1,
  pointerEvents: 'none',
});

export interface IRippleProps {
  color?: string;
  ms?: number;
}

export interface IRippleState {
}

export class Ripple extends React.Component<IRippleProps, IRippleState> {
  static defaultProps = {
    color: 'rgba(0,0,0,.2)',
    ms: 400
  };

  el: HTMLElement = null;
  elRipple: HTMLDivElement = null;

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  refRipple = (el) => {
    this.elRipple = el;
  };

  onMouseDown = (originalMouseDown) => (event) => {
    if (!this.elRipple) {
      return;
    }

    const {left, top} = this.el.getBoundingClientRect();
    const posX = left + window.scrollX;
    const posY = top + window.scrollY;
    const elX = event.pageX - posX;
    const elY = event.pageY - posY;
    const style = this.elRipple.style;

    style.removeProperty('animation');
    style.top = (elY - 50) + 'px';
    style.left = (elX - 50) + 'px';
    setTimeout(() => {
      style.setProperty('animation', `${rippleAnimationName} ${this.props.ms}ms linear`);
    }, 35);

    (originalMouseDown || noop)(event);
  };

  render () {
    const {children, color} = this.props;
    const element = React.Children.only(children);
    const ripple = h('div', {
      className,
      style: {
        background: color,
      },
      ref: this.refRipple
    });

    let style = element.props.style || {};

    style = Object.assign({}, style, {
      overflow: 'hidden',
      position: 'relative'
    });

    const innerChildren = React.Children.toArray(element.props.children);

    innerChildren.push(ripple);

    return React.cloneElement(element, {
      ...element.props,
      style,
      ref: this.ref(element.props.ref),
      onMouseDown: this.onMouseDown(element.props.onMouseDown)
    }, ...innerChildren);
  }
}

export const withRipple = (tag: string, rippleProps = null) =>
  (props) =>h(Ripple, rippleProps, h(tag, props));
