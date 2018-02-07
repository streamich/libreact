import {Component} from 'react';
import renderProp from '../util/renderProp';
import {noop} from '../util';

export interface IErrorBoundaryProps {
  children: any;
  render: any;
  comp: any;
  component: any;
  fallback?: (state: IErrorBoundaryState) => React.ReactElement<any>;
  onError?: (error?: Error, info?) => void;
}

export interface IErrorBoundaryState {
  error?: Error;
  info?: any;
}

export class ErrorBoundary extends Component<any, any> {
  state: IErrorBoundaryState = {
  };

  componentDidCatch (error, info) {
    this.setState({
      error,
      info
    });
    (this.props.onError || noop)(error, info);
  }

  render () {
    const {props, state} = this;
    const {fallback} = props;

    return state.error ?
      (typeof fallback === 'function' ? fallback(state) : null) :
      renderProp(props, state);
  }
}
