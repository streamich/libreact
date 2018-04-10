import {Component, cloneElement} from 'react';
import {h, noop} from '../util';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IMouseSensorProps {
  bond?: string | boolean;
  children?: (state: IMouseSensorState) => React.ReactElement<any>;
  render?: (state: IMouseSensorState) => React.ReactElement<any>;
  whenHovered?: boolean;
  onMouseMove?: (state: IMouseSensorState) => void;
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

  ref = (originalRef?) => (el) => {
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
      const state = {
        docX: event.pageX,
        docY: event.pageY,
        posX,
        posY,
        elH: el.offsetHeight,
        elW: el.offsetWidth,
        elX: event.pageX - posX,
        elY: event.pageY - posY
      };

      this.setState(state);
      (this.props.onMouseMove || noop)(state);
    });
  };

  onMouseEnter = (originalOnMouseMove?) => (event) => {
    if (this.props.whenHovered) {
      this.bindEvents();
    }
    (originalOnMouseMove || noop)(event);
  };

  onMouseLeave = (originalOnMouseMove?) => (event) => {
    if (this.props.whenHovered) {
      this.unbindEvents();
    }
    (originalOnMouseMove || noop)(event);
  };

  render () {
    let {bond} = this.props;

    if (bond) {
      if (typeof bond === 'boolean') {
        bond = 'bond';
      }

      const bondObject: any = {
        ref: this.ref()
      };

      if (!this.props.whenHovered) {
        bondObject.onMouseEnter = this.onMouseEnter();
        bondObject.onMouseLeave = this.onMouseLeave();
      }

      return renderProp(this.props, {
        ...this.state,
        [bond]: bondObject
      });
    } else {
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
}

const MouseSensorWithBond = (props) => h(MouseSensor, {
  bond: true,
  ...props
});

export const withMouse = faccToHoc(MouseSensorWithBond, 'mouse');
