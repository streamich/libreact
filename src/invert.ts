import * as React from 'react';
import {h, noop} from './util';
import renderProp from './util/renderProp';

export interface IInvertedProps extends React.AllHTMLAttributes<any> {
  children?: React.ReactElement<any> | ((comp) => React.ReactElement<any>);
  render?: React.ReactElement<any> | ((comp) => React.ReactElement<any>);
  onMount: (el: HTMLElement, comp: React.Component<any>) => void;
  onUnmount: (el: HTMLElement, comp: React.Component<any>) => void;
  wrapper: (element: React.ReactElement<any>, comp: React.Component<any>) => React.ReactElement<any>;
  tag?: keyof React.ReactHTML;
}

export type TInvert = (tag?: keyof React.ReactHTML) => React.ComponentClass<any>;

const defaultWrapper = (element) => element;

export const invert: TInvert = (tag?: keyof React.ReactHTML) => {
  const Inverted = class Inverted extends React.Component<IInvertedProps, any> {
    static defaultProps = {
      wrapper: defaultWrapper
    };

    el: HTMLElement = null;

    ref = (el) => {
      this.el = el;
    };

    componentDidMount () {
      (this.props.onMount || noop)(this.el, this);
      this.forceUpdate();
    }

    componentWillUnmount () {
      (this.props.onUnmount || noop)(this.el, this);
      this.el = null;
    }

    event (handler: (...args) => void) {
      return (event) => {
        handler(event, this.el, this);
        this.forceUpdate();
      };
    }

    render () {
      const {children, render, wrapper, tag: tagProp, onMount, onUnmount, ...rest} = this.props;
      const props = {
        ref: this.ref
      };

      for (const name in rest) {
        const value = rest[name];

        if ((name[0] === 'o') && (name[1] === 'n') && (typeof value === 'function')) {
          props[name] = this.event(value);
        } else {
          props[name] = value;
        }
      }

      const element = h(tagProp || tag, props, renderProp(this.props, this));

      return wrapper(element, this);
    }
  }

  return Inverted;
};

export const Inverted = invert();
