import * as React from 'react';

export interface IResolveProps {
  promise: Promise<any>;
  children?: (state: IResolveState) => React.ReactElement<any>;
}

export interface IResolveState {
  pending: boolean;
  value?: any;
  error?: any;
}

export class Resolve extends React.Component<IResolveProps, any> {
  mounted = false;

  state: IResolveState = {
    pending: true
  };

  constructor (props, context) {
    super(props, context);

    this.resolve();
  }

  componentDidMount () {
    this.mounted = true;
  }

  componentDidUpdate ({promise}) {
    if (promise !== this.props.promise) {
      this.resolve();
    }
  }

  componentWillUnmount () {
    this.mounted = false;
  }

  resolve () {
    const {promise} = this.props;

    promise
      .then((value) => {
        if (this.mounted && (promise === this.props.promise)) {
          this.setState({
            pending: false,
            value
          });
        }
      })
      .catch((error) => {
        if (this.mounted && (promise === this.props.promise)) {
          this.setState({
            pending: false,
            error
          });
        }
      });
  }

  render () {
    return this.props.children(this.state);
  }
}
