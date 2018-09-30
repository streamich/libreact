import * as React from 'react';
import {noop, isClient} from '../util';

export interface IPromptProps {
  children?: React.ReactElement<any> | ((result: string) => React.ReactElement<any>);
  show?: boolean;
  message?: string;
  default?: string;
  onResult?: (result: string) => void;
}

export class Prompt extends React.PureComponent<IPromptProps, any> {
  componentDidMount () {
    if (!(typeof this.props.children === 'function')) {
      this.prompt();
    }
  }

  componentDidUpdate () {
    if (!(typeof this.props.children === 'function')) {
      this.prompt();
    }
  }

  prompt (): string {
    const {show, message, default: def, onResult} = this.props;

    if (show) {
      const result = prompt(message, def);

      (onResult || noop)(result);

      return result;
    }

    return undefined;
  }

  render () {
    const {children, default: def} = this.props;

    if (typeof children === 'function') {
      if (isClient) {
        const result = this.prompt();

        return children(result);
      } else {
        return children(def);
      }
    } else {
      return (children as React.ReactElement<any>) || null;
    }
  }
}
