import {Component} from 'react';

export interface IResolveProps {
  promise: Promise<any>;
  children?: (state: IResolveState) => React.ReactElement<any>;
}

export interface IResolveState {
  pending: boolean;
  value?: any;
  error?: any;
}

export class Resolve extends Component<IResolveProps, any> {
  mounted = false;

  state: IResolveState = {
    pending: true
  };

  constructor (props, context) {
    super(props, context);

    this.props.promise
      .then((value) => {
        if (this.mounted) {
          this.setState({
            pending: false,
            value
          });
        }
      })
      .catch((error) => {
        if (this.mounted) {
          this.setState({
            pending: false,
            error
          });
        }
      })
  }

  componentDidMount () {
    this.mounted = true;
  }

  componentWillUnmount () {
    this.mounted = false;
  }

  render () {
    return this.props.children(this.state);
  }
}
