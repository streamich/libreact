import {Component, cloneElement} from 'react';
import {h, noop} from '../util';
import {go} from '../route';
import renderProp from '../util/renderProp';

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export interface ILinkProps extends React.AllHTMLAttributes<any> {
  replace?: boolean;
  state?: any | ((props: ILinkProps) => any);
  to?: string;
  a?: boolean;
}

export interface ILinkState {

}

export class Link extends Component<ILinkProps, any> {
  el: HTMLElement = null;
  target: string = '';

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  onClick = (originalClick) => (event) => {
    (originalClick || noop)(event);

    const {replace, to, state} = this.props;

    if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      go(to, {
        replace,
        state: typeof state === 'function' ? state(this.props) : state
      });
    }
  };

  render () {
    const {replace, state, to, a, ...rest} = this.props;
    let element = renderProp(this.props, {
      go,
      to
    });

    if (!element) {
      return null;
    }

    if (a || (typeof element !== 'object')) {
      element = h('a', rest, element);
    }

    const props: any = {
      ref: this.ref(element.ref),
      onClick: this.onClick(element.props.originalClick)
    };

    this.target = '';

    if (element.type === 'a') {
      this.target = element.props.target;
      props.href = to;
    }

    return cloneElement(element, props);
  }
}
