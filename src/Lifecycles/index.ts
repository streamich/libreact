import {Component} from 'react';
import {render} from 'react-universal-interface';
import {noop} from '../util';

export interface ILifecyclesProps {
  [key: string]: any;
  willMount?: (props) => void;
  didMount?: (props) => void;
  willReceiveProps?: (nextProps, props) => void;
  shouldUpdate?: (nextProps, props) => boolean;
  willUpdate?: (nextProps, props) => void;
  didUpdate?: (props, prevProps) => void;
  willUnmount?: (props) => void;
  didCatch?: (error, info, props) => void;
}

export class Lifecycles extends Component<ILifecyclesProps, {}> {
  static defaultProp = {
    willMount: noop,
    didMount: noop,
    willReceiveProps: noop,
    shouldUpdate: noop,
    willUpdate: noop,
    didUpdate: noop,
    willUnmount: noop,
    didCatch: noop,
  };

  componentWillMount () {
    return this.props.willMount(this.props);
  }

  componentDidMount () {
    return this.props.didMount(this.props);
  }

  componentWillReceiveProps (nextProps) {
    return this.props.willReceiveProps(nextProps, this.props);
  }

  shouldComponentUpdate (nextProps) {
    return this.props.shouldUpdate(nextProps, this.props);
  }

  componentWillUpdate (nextProps) {
    return this.props.willUpdate(nextProps, this.props);
  }

  componentDidUpdate (prevProps) {
    return this.props.didUpdate(this.props, prevProps);
  }

  componentWillUnmount () {
    return this.props.willUnmount(this.props);
  }

  componentDidCatch (error, info) {
    return this.props.didCatch(error, info, this.props);
  }

  render () {
    return render(this.props, null);
  }
}
