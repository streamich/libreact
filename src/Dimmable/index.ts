import * as React from 'react';
import {IDimmableProps} from './index';
import {h, noop} from '../util';
import {Dimmer, IDimmerProps} from '../Dimmer';

const onlyTextNodes = (children) => {
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === 'object') {
      return false;
    }
  }

  return true;
};

export interface IDimmableProps extends IDimmerProps {
  dim?: boolean;
  blur?: number;
  renderOverlay?: (dim?: boolean) => React.ReactChild;
}

export class Dimmable extends React.Component<IDimmableProps> {
  static defaultProps = {
    blur: 5,
  };

  render () {
    const {children, dim, blur, renderOverlay, ...rest} = this.props;
    const element = React.Children.only(children);
    const elementChildren = React.Children.toArray(element.props.children);
    let child: React.ReactChild;
    const dimmerProps: IDimmerProps = rest;

    dimmerProps.hidden = !dim;

    let childProps = null;

    if (dim) {
      childProps = {
        'aria-hidden': 'true',
        style: {
          pointerEvents: 'none'
        }
      };

      if (blur) {
        childProps.style = {
          filter: `blur(${blur}px)`
        };
      }
    }

    if ((elementChildren.length === 1) && (typeof elementChildren[0] === 'object')) {
      child = elementChildren[0] as React.ReactElement<any>;

      if (childProps) {
        if (child.props.style) {
          childProps.style = {
            ...child.props.style,
            ...childProps.style
          };

          if (childProps.style.filter && child.props.style.filter) {
            childProps.style.filter += ' ' + child.props.style.filter;
          }
        }

        child = React.cloneElement(child, childProps);
      }
    } else {
      child = h(onlyTextNodes(elementChildren) ? 'span' : 'div', childProps, ...elementChildren);
    }

    return React.cloneElement(element, {
      style: {
        ...(element.props.style || {}),
        position: 'relative'
      }
    },
      child,
      h(Dimmer, rest, (renderOverlay || noop)(dim)),
    );
  }
}
