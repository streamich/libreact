import {Component} from 'react';

export interface ILocalStorageProps {
  key: string;
  value: string;
  persist?: boolean;
}

export class LocalStorage extends Component<ILocalStorageProps, any> {

  componentDidMount () {
    this.put();
  }

  componentDidUpdate (props) {
    if (props.key !== this.props.key) {
      this.remove();
      this.put();
    } else {
      this.put();
    }
  }

  componentWillUnmount () {
    this.remove();
  }

  put () {
    const {key, value} = this.props;

    localStorage[key] = value;
  }

  remove (key = this.props.key) {
    if (!this.props.persist) {
      delete localStorage[key];
    }
  }

  render () {
    return null;
  }
}
