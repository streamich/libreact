import {Component} from 'react';
import {noop} from '../util';

export interface ILocalStorageProps {
  name: string;
  data: string;
  persist?: boolean;
  onMount?: (data) => void;
}

export class LocalStorage extends Component<ILocalStorageProps, any> {

  componentDidMount () {
    const {name} = this.props;
    const json = localStorage[name];

    if (typeof json === 'string') {
      try {
        const data = JSON.parse(json);

        (this.props.onMount || noop)(data);
      } catch {}
    }
    this.put();
  }

  componentDidUpdate (props) {
    if (props.key !== this.props.name) {
      this.remove();
      this.put();
    } else {
      if (props.value !== this.props.data) {
        this.put();
      }
    }
  }

  componentWillUnmount () {
    this.remove();
  }

  put () {
    const {name, data} = this.props;

    try {
      localStorage[String(name)] = JSON.stringify(data);
    } catch (error) {

    }
  }

  remove (name = this.props.name) {
    if (!this.props.persist) {
      delete localStorage[name];
    }
  }

  render () {
    return null;
  }
}
