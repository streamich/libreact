import * as React from 'react';
import {isClient} from '../util';
import RAF from './RAF';

export interface IAfterDrafState {
  ready: boolean;
}

export const createSingleRunDraf = isClient
  ? () => {
    let signelDrafFinished = false;

    return class extends React.Component<{}, IAfterDrafState> {
      frame;
      state: IAfterDrafState;

      constructor (props, context) {
        super(props, context);

        if (isClient && !signelDrafFinished) {
          this.state = {
            ready: false
          };
        }
      }

      componentDidMount () {
        if (!signelDrafFinished) {
          this.frame = RAF(() => {
            this.frame = RAF(() => {
              signelDrafFinished = true;
              this.setState({ready: true});
            });
          });
        }
      }

      componentWillUnmount () {
        if (this.frame) {
          cancelAnimationFrame(this.frame);
        }
      }

      render () {
        if (!isClient || signelDrafFinished) {
          return this.props.children;
        }

        return this.state.ready ? this.props.children : null;
      }
    }
  }
  : () => (props) => props.children;

export default createSingleRunDraf;
