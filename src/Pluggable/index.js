import {Component} from 'react';
import {h} from '../util';

export class Pluggable extends Component {
  plugins = [];

  constructor (props, context) {
    super(props, context);
  }

  exec = (name) => {
    const {plugins} = this.props;
    let result;
    let method = this.props[name];

    if (method) {

    }

    for (let i = 0; i < plugins.length; i++) {
      method = plugins[i][name];

      if (!method) {
        continue;
      }

      result = method(this);

      if (result !== undefined) {
        return result;
      }
    }
  };

  render () {

  }
}
