import * as React from 'react';
import {isClient} from '../util';

export interface IAfterDrafState {
  ready: boolean;
}

export const AfterDraf = isClient
  ? class AfterDraf extends React.Component<{}, IAfterDrafState> {
    frame;
    state: IAfterDrafState;

    constructor (props, context) {
      super(props, context);

      if (isClient) {
        this.state = {
          ready: false
        };
      }
    }

    componentDidMount () {
      const RAF = requestAnimationFrame;

      this.frame = RAF(() => {
        this.frame = RAF(() => {
          this.setState({ready: true});
        });
      });
    }

    componentWillUnmount () {
      cancelAnimationFrame(this.frame);
    }

    render () {
      return this.state.ready ? this.props.children : null;
    };
  }
  : (props) => props.children;
