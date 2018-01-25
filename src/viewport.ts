import {Component} from 'react';
import {h} from './util';
import {ViewportSensor} from './ViewportSensor';
import {loadable} from './loadable';

export const viewport = (params) => {
  const {Loadable} = params;

  const Viewport = class Viewport extends Component<any, any> {
    state = {
      flipped: false
    };

    onChange = () => {
      Loadable.load();
      this.setState({
        flipped: true
      });
    };

    render () {
      const {flipped} = this.state;

      return flipped ?
        h(Loadable, this.props) :
        h(ViewportSensor, {onChange: this.onChange},
          h('div')
        );
    }
  };

  return Viewport;
};
