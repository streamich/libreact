import {IDimmableProps} from './index';
import {Component, Children, cloneElement} from 'react';
import {h, noop} from '../util';
import {Dimmer, IDimmerProps} from '../Dimmer';

export interface IDimmableProps extends IDimmerProps {
  dim?: boolean;
  blur?: number;
  renderOverlay?: (dim?: boolean) => React.ReactChild;
}

export class Dimmable extends Component<IDimmableProps> {
  static defaultProps = {
    blur: 5,
  };

  render () {
    const {children, dim, ...rest} = this.props;
    const element = Children.only(children);
    const elementChildren = Children.toArray(element.props.children);
    let elementChild: React.ReactChild;
    const dimmerProps: IDimmerProps = rest;

    dimmerProps.hidden = !dim;

    const elementChildrenProps = {};

    if ((elementChildren.length === 1) && (typeof elementChildren[0] === 'object')) {
      elementChild = elementChildren[0];
    } else {
      elementChild = h('div', elementChildrenProps, ...elementChildren);
    }

    return cloneElement(element, {},
      elementChild,
      h(Dimmer, rest, (this.props.renderOverlay || noop)(dim)),
    );
  }
}
