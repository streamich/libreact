// Props to: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js
import {Component} from 'react';
import {h} from '../util';
import {go} from '.';

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export interface ILinkProps {
  onClick?: (event) => void;
  target?: string;
  replace?: boolean;
  state?: any;
  to?: string;
  innerRef?: (el) => void;
}

export class Link extends Component<ILinkProps, any> {
  onClick = (event) => {
    const {onClick, replace, target, to, state} = this.props;

    if (onClick) {
      onClick(event);
    }

    if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      go(to, {
        replace,
        state: typeof state === 'function' ? state() : state
      });
    }
  };

  render () {
    const {props, onClick} = this;
    const {replace, to, innerRef: ref, ...rest} = this.props;

    return h('a', {
      ...rest,
      href: to,
      ref,
      onClick,
    });
  }
}
