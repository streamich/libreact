import {Component, createElement as h} from 'react';
import {isClient} from '../util';

export interface IScrollSensorProps {
  children?: (scroll: IScrollSensorState) => React.ReactElement<any>;
  el?: Element;
}

export interface IScrollSensorState {
  x: number,
  y: number,
}

export class ScrollSensor extends Component<IScrollSensorProps, IScrollSensorState> {
  state: IScrollSensorState = {
    x: NaN,
    y: NaN
  };

  get el (): Element | Window {
    const {el} = this.props;

    return el ? el : (el === undefined ? window : null);
  }

  componentWillMount () {
    if (isClient) {
      this.onScroll();
    }
  }

  componentDidMount () {
    this.onScroll();
    this.addListener();
  }

  onScroll = () => {
    const {el}: {el: any} = this;

    if (el) {
      this.setState({
        x: el.scrollX || el.scrollLeft,
        y: el.scrollX || el.scrollTop
      });
    }
  };

  addListener () {
    const {el} = this;

    if (el) {
      el.addEventListener('scroll', this.onScroll, {
        capture: false,
        passive: true
      } as any);
    }
  }

  removeListener () {
    const {el} = this;

    if (el) {
      el.removeEventListener('scroll', this.onScroll);
    }
  }

  render () {
    const {children} = this.props;

    return children(this.state);
  }
}
