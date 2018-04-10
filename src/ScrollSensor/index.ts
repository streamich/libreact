import {Component} from 'react';
import renderProp from '../util/renderProp';

export interface IScrollSensorProps {
  children?: (scroll: IScrollSensorState) => React.ReactElement<any>;
  el?: Element;
}

export interface IScrollSensorState {
  x: number,
  y: number,
}

export class ScrollSensor extends Component<IScrollSensorProps, IScrollSensorState> {
  frame;

  state: IScrollSensorState = {
    x: 0,
    y: 0
  };

  componentDidMount () {
    this.onScroll();
    this.addListener();
  }

  componentDidUpdate (props) {
    if (props.el !== this.props.el) {
      this.removeListener(props.el);
      this.addListener();
    }
  }

  componentWillUnmount () {
    this.removeListener();
  }

  onScroll = () => {
    const {el} = this.props;

    if (el) {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(() => {
        this.setState({
          x: el.scrollLeft,
          y: el.scrollTop
        });
      });
    }
  };

  addListener () {
    const {el} = this.props;

    if (el) {
      el.addEventListener('scroll', this.onScroll, {
        capture: false,
        passive: true
      } as any);
    }
  }

  removeListener (el: Element = this.props.el) {
    if (el) {
      el.removeEventListener('scroll', this.onScroll);
    }
  }

  render () {
    return renderProp(this.props, this.state);
  }
}
