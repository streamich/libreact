import {Component} from 'react';
import {h, noop} from '../util';

export interface IErrorBoundaryProps {
  children: any;
  renderError?: (state: IErrorBoundaryState) => React.ReactElement<any>;
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
    const {renderError, children} = props;

    return state.error ?
      (typeof renderError === 'function' ? renderError(state) : null) :
      children;
  }
}

export const withErrorBoundary = (Comp, boundaryProps) => (props) => {
  return h(ErrorBoundary, boundaryProps,
    h(Comp, props)
  );
};
