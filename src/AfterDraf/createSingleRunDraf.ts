import {Component} from 'react';
import {isClient} from '../util';

export interface IAfterDrafState {
  ready: boolean;
}

export const createSingleRunDraf = isClient
  ? () => {
    let done = false;

    return class extends Component<{}, IAfterDrafState> {
      frame;
      state: IAfterDrafState;

      constructor (props, context) {
        super(props, context);

        if (isClient && !done) {
          this.state = {
            ready: false
          };
        }
      }

      componentDidMount () {
        if (!done) {
          const RAF = requestAnimationFrame;

          this.frame = RAF(() => {
            this.frame = RAF(() => {
              done = true;
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
        if (!isClient || done) {
          return this.props.children;
        }

        return this.state.ready ? this.props.children : null;
      }
    }
  }
  : () => (props) => props.children;

export default createSingleRunDraf;
