import * as React from 'react';
import {h, noop} from '../util';
import go, {TGo} from '../route/go';
import renderProp from '../util/renderProp';

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export interface ILinkProps extends React.AllHTMLAttributes<any> {
  bond?: boolean | string;
  replace?: boolean;
  state?: any | ((props: ILinkProps) => any);
  to?: string;
  a?: boolean;
  onGo?: TGo;
  isActive?: boolean;
}

export interface ILinkState {
}

class Link extends React.Component<ILinkProps, ILinkState> {
  static defaultProps = {
    onGo: go
  };

  el: HTMLElement = null;
  target: string = '';

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  onClick = (originalClick?) => (event) => {
    (originalClick || noop)(event);

    const {onGo, replace, to, state} = this.props;

    if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.target && // let browser handle "target=*"
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      onGo(to, {
        replace,
        state: typeof state === 'function' ? state(this.props) : state
      });
    }
  };

  render () {
    let {bond, replace, state, to, a, isActive, ...rest} = this.props;
    const renderPropState: any = {
      isActive,
      go,
      to
    };

    if (bond) {
      if (typeof bond !== 'string') {
        bond = 'bond';
      }

      renderPropState[bond] = {
        onClick: this.onClick()
      };
    }

    let element = renderProp(this.props, renderPropState);

    if (!element) {
      return null;
    }

    if (a || (typeof element !== 'object')) {
      element = h('a', rest, element);
    }

    const props: any = {
      ref: this.ref(element.ref)
    };

    if (!bond) {
      props.onClick = this.onClick(element.props.originalClick);
    }

    this.target = '';

    if (element.type === 'a') {
      this.target = element.props.target;
      props.href = to;
    }

    return React.cloneElement(element, props);
  }
}

export default Link;
