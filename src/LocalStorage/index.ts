import {Component} from 'react';

export interface ILocalStorageProps {
  name: string;
  value: string;
  persist?: boolean;
}

export class LocalStorage extends Component<ILocalStorageProps, any> {

  componentDidMount () {
    this.put();
  }

  componentDidUpdate (props) {
    if (props.key !== this.props.name) {
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
    const {name, value} = this.props;

    localStorage[name] = value;
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
