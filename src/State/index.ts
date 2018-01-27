import {Component} from 'react';
import {noop} from '../util';
import renderProp from '../util/renderProp';

export interface IStateProps {
  children?: (state, setState?) => React.ReactElement<any>;
  render?: (state, setState?) => React.ReactElement<any>;
  init: object,
  onChange?: (state: any) => void;
  onMount?: (state) => void;
  onUnmount?: (state) => void;
}

export interface IStateState {

}

export class State extends Component<IStateProps, IStateState> {
  static defaultProps = {
    onChange: noop,
    onMount: noop,
    onUnmount: noop
  };

  state: IStateState;

  constructor (props, context) {
    super(props, context);

    this.state = props.init || {};
    this.setState = this.setState.bind(this);
  }

  componentDidMount () {
    this.props.onMount(this.state);
  }

  componentWillUnmount () {
    this.props.onUnmount(this.state);
  }

  render () {
    return renderProp(this.props, this.state, this.setState);
  }
}
