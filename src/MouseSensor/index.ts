import {Component, Children, cloneElement} from 'react';
import {h, noop} from '../util';
import renderProp from '../util/renderProp';
import {extend} from 'fast-extend';

export interface IMouseSensorProps {
  children?: (state: IMouseSensorState) => React.ReactElement<any>;
  render?: (state: IMouseSensorState) => React.ReactElement<any>;
  whenHovered?: boolean;
}

export interface IMouseSensorState {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elH: number;
  elW: number;
  elX: number;
  elY: number;
}

export class MouseSensor extends Component<IMouseSensorProps, IMouseSensorState> {
  state: IMouseSensorState = {
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elH: 0,
    elW: 0,
    elX: 0,
    elY: 0
  };

  el: HTMLElement = null;
  frame = null;

  ref = (originalRef) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  componentDidMount () {
    if (!this.props.whenHovered) {
      this.bindEvents();
    }
  }

  componentWillUnmount () {
    this.unbindEvents();
  }

  bindEvents () {
    document.addEventListener('mousemove', this.onDocMouseMove);
  }

  unbindEvents () {
    document.removeEventListener('mousemove', this.onDocMouseMove);
  }

  onDocMouseMove = (event) => {
    const {el} = this;

    if (!el) {
      return;
    }

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const {left, top} = el.getBoundingClientRect();
      const posX = left + window.scrollX;
      const posY = top + window.scrollY;

      this.setState({
        docX: event.pageX,
        docY: event.pageY,
        posX,
        posY,
        elH: el.offsetHeight,
        elW: el.offsetWidth,
        elX: event.pageX - posX,
        elY: event.pageY - posY
      });
    });
  };

  onMouseEnter = (originalOnMouseMove) => (event) => {
    if (this.props.whenHovered) {
      this.bindEvents();
    }
    (originalOnMouseMove || noop)(event);
  };

  onMouseLeave = (originalOnMouseMove) => (event) => {
    if (this.props.whenHovered) {
      this.unbindEvents();
    }
    (originalOnMouseMove || noop)(event);
  };

  render () {
    const element = renderProp(this.props, this.state);

    let newProps: any = {
      ...element.props,
      ref: this.ref(element.ref)
    };

    if (!this.props.whenHovered) {
      const {onMouseEnter, onMouseLeave} = element.props;

      newProps.onMouseEnter = this.onMouseEnter(onMouseEnter);
      newProps.onMouseLeave = this.onMouseLeave(onMouseLeave);
    }

    return cloneElement(element, newProps);
  }
}
