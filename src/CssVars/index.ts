import {Component} from 'react';

const vars = {
  color: 'red'
};

export class CssVars extends Component<any, any> {
  render () {
    return this.props.children;
  }
}
