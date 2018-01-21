import {Component} from 'react';
import {h, noop} from './util';

export interface IInvertedProps {
  children?: (...args) => React.ReactElement<any>;
  onMounted: (el: HTMLElement, comp: React.Component<any>) => void;
  render: (element: React.ReactElement<any>, comp: React.Component<any>) => React.ReactElement<any>;
}

export type TInvert = (tag: string) => React.ComponentClass<any>;

const defaultRenderProp = (element) => element;

export const invert: TInvert = (tag: keyof React.ReactHTML) => {
  const Inverted = class Inverted extends Component<IInvertedProps, any> {
    static defaultProps = {
      render: defaultRenderProp
    };

    el: HTMLElement = null;

    ref = (el) => {
      this.el = el;
    };

    componentDidMount () {
      (this.props.onMounted || noop)(this.el, this);
    }

    compnentWillUnmount () {
      this.el = null;
    }

    event (name: string, handler: (...args) => void) {
      return (event) => {
        handler(event, this);
        this.forceUpdate();
      };
    }

    render () {
      const {event} = this;
      const {children, render, ...rest} = this.props;
      const props = {
        ref: this.ref
      };

      for (const name in rest) {
        const value = rest[name];

        if ((name[0] === 'o') && (name[1] === 'n') && (typeof value === 'function')) {
          props[name] = this.event(name, value);
        } else {
          props[name] = value;
        }
      }

      const element = h(tag, props, typeof children === 'function' ? children(this) : children);

      return render(element, this);
    }
  }

  return Inverted;
};
