import {PureComponent} from 'react';

export interface IAlertProps {
  show?: boolean;
  text?: string;
}

export class Alert extends PureComponent<IAlertProps, any> {
  componentDidMount () {
    this.alert();
  }

  componentDidUpdate () {
    this.alert();
  }

  alert () {
    const {show, text} = this.props;

    if (show) {
      alert(text);
    }
  }

  render () {
    return null;
  }
}
