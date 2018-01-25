import {Component} from 'react';
import {noop} from '../util';
import renderProp from '../util/renderProp';

export interface IStateProps {
  children?: (state: IStateState, setState?) => React.ReactElement<any>;
  init: object,
  onChange?: (state: any) => void;
  render?: (state: any, setState?) => void;
}

export interface IStateState {

}

export class State extends Component<IStateProps, IStateState> {
  static defaultProps = {
    onChange: noop
  };

  state: IStateState;

  constructor (props, context) {
    super(props, context);

    this.state = props.init;
    this.setState = this.setState.bind(this);
  }

  render () {
    return renderProp(this.props, this.state, this.setState);
  }
}
