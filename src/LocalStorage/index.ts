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
      if (props.value !== this.props.value) {
        this.put();
      }
    }
  }

  componentWillUnmount () {
    this.remove();
  }

  put () {
    const {name, value} = this.props;

    localStorage[String(name)] = String(value);
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
