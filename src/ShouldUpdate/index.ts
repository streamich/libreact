import {Component} from 'react';
import {h} from '../util';
import renderProp from '../util/renderProp';

export interface IShouldUpdateProps {
  props;
  when: (newProps, oldProps) => boolean;
}

export interface IShouldUpdateState {
}

export class ShouldUpdate extends Component<IShouldUpdateProps, IShouldUpdateState> {
  shouldComponentUpdate (props) {
    return this.props.when(props.props, this.props.props);
  }

  render () {
    return renderProp(this.props, this.props.props);
  }
}

export const shouldUpdate = (when) => (Comp) => (props) =>
  h(ShouldUpdate, {when, props}, h(Comp, props));
