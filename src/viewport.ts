import * as React from 'react';
import {h} from './util';
import {ViewportSensor} from './ViewportSensor';
import {pixel} from './pixel';

export interface IViewportParams {
  placeholder: React.ReactElement<any>;
}

export type TViewport = <P>(Comp: React.StatelessComponent<P> | React.ComponentClass<P>, params: IViewportParams) => React.ComponentClass<P>;

export const viewport = (Comp, {placeholder = pixel} = {}) => {
  let flipped = false;

  const Viewport = class Viewport extends React.Component<any, any> {
    onChange = () => {
      flipped = true;
      this.forceUpdate();
    };

    render () {
      return flipped ?
        h(Comp, this.props) :
        h(ViewportSensor, {onChange: this.onChange}, placeholder)
    }
  }

  return Viewport;
};
