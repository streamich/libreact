import {Component} from 'react';
import {noop} from '../util';

export interface ILifecyclesProps {
  didMount?: (props) => void;
  shouldUpdate?: (nextProps, props) => boolean;
  getSnapshotBeforeUpdate?: (prevProps, props) => any;
  didUpdate?: (props, prevProps, snapshot) => void;
  willUnmount?: (props) => void;
  didCatch?: (error, info, props) => void;
  [key: string]: any;
}

export class Lifecycles extends Component<ILifecyclesProps, {}> {
  static defaultProps = {
    didMount: noop,
    shouldUpdate: noop,
    getSnapshotBeforeUpdate: noop,
    didUpdate: noop,
    willUnmount: noop,
    didCatch: noop,
  };

  componentDidMount () {
    return this.props.didMount(this.props);
  }

  shouldComponentUpdate (nextProps) {
    const result = this.props.shouldUpdate(nextProps, this.props);
    return typeof result === 'boolean' ? result : true;
  }

  getSnapshotBeforeUpdate(prevProps) {
    return this.props.getSnapshotBeforeUpdate(prevProps, this.props) || null;
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    return this.props.didUpdate(this.props, prevProps, snapshot);
  }

  componentWillUnmount () {
    return this.props.willUnmount(this.props);
  }

  componentDidCatch (error, info) {
    return this.props.didCatch(error, info, this.props);
  }

  render () {
    return this.props.children;
  }
}
