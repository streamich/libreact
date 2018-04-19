import {Component} from 'react';
import {isClient} from '../util';

export interface IAfterDrafState {
  ready: boolean;
}

const Passthrough = (props) => props.children;

export const createAfterDraf = (times = 1) => {
  let cnt = 0;

  return class extends Component<{}, IAfterDrafState> {
    frame;
    state: IAfterDrafState;

    constructor (props, context) {
      super(props, context);

      if (isClient && cnt < times) {
        this.state = {
          ready: false
        };
      }
    }

    componentDidMount () {
      if (isClient && cnt < times) {
        const RAF = requestAnimationFrame;

        this.frame = RAF(() => {
          this.frame = RAF(() => {
            cnt++;
            this.setState({ready: true});
          });
        });
      }
    }

    componentWillUnmount () {
      if (isClient && cnt < times) {
        cancelAnimationFrame(this.frame);
      }
    }

    render () {
      if (!isClient || cnt >= times) {
        return this.props.children;
      }

      return this.state.ready ? this.props.children : null;
    }
  }
};

export const AfterDraf = isClient ? createAfterDraf(Infinity) : Passthrough;
