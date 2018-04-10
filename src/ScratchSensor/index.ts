import {IScratchSensorState} from './index';
import {Component, cloneElement} from 'react';
import {noop, on, off} from '../util';
import {render, createEnhancer} from 'react-universal-interface';

export interface IScratchSensorProps {
  bond?: boolean | string;
  children?: React.ReactElement<any> | ((state: IScratchSensorStateWithBond) => React.ReactElement<any>);
  render?: (state: IScratchSensorStateWithBond) => React.ReactElement<any>;
  disabled?: boolean;
  onScratch?: (state: IScratchSensorState) => void;
  onScratchStart?: (state: IScratchSensorState) => void;
  onScratchEnd?: (state: IScratchSensorState) => void;
}

export interface IScratchSensorState {
  isScratching?: boolean;
  start?: number;
  end?: number;
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
  docX?: number;
  docY?: number;
  posX?: number;
  posY?: number;
  elH?: number;
  elW?: number;
  elX?: number;
  elY?: number;
}

export interface IScratchSensorBond {
  ref?: any;
  onMouseDown?: any;
  onTouchStart?: any;
}

export interface IScratchSensorStateWithBond extends IScratchSensorState {
  [bond: string]: any;
  bond?: IScratchSensorBond;
}

export class ScratchSensor extends Component<IScratchSensorProps, IScratchSensorState> {
  static defaultProps = {
    disabled: false,
    onScratch: noop,
    onScratchStart: noop,
    onScratchEnd: noop,
  };

  state: IScratchSensorState = {
    isScratching: false,
  };

  el: HTMLElement = null;
  frame = null;

  ref = (originalRef?) => (el) => {
    this.el = el;
    (originalRef || noop)(el);
  };

  componentWillUnmount () {
    this.unbindEvents();
  }

  onMouseDown = (originalMouseDown?) => (event) => {
    (originalMouseDown || noop)(event);
    this.startScratching(event.pageX, event.pageY);
  };

  onTouchStart = (originalTouchStart?) => (event) => {
    (originalTouchStart || noop)(event);
    this.startScratching(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
  };

  startScratching (docX, docY) {
    if (this.state.isScratching) {
      return;
    }

    const {el} = this;

    if (!el) {
      return;
    }

    const {left, top} = el.getBoundingClientRect();
    const elX = left + window.scrollX;
    const elY = top + window.scrollY;
    const x = docX - elX;
    const y = docY - elY;
    const time = Date.now();
    const newState = {
      isScratching: true,
      start: time,
      end: time,
      docX,
      docY,
      x,
      y,
      dx: 0,
      dy: 0,
      elH: el.offsetHeight,
      elW: el.offsetWidth,
      elX,
      elY,
    };

    this.props.onScratchStart(newState);
    this.setState(newState);
    this.bindEvents();
  }

  stopScratching = () => {
    if (this.state.isScratching) {
      this.setState({isScratching: false});
      this.props.onScratchEnd({
        ...this.state,
        isScratching: false,
      });
      this.unbindEvents();
    }
  };

  bindEvents () {
    on(document, 'mousemove', this.onMouseMove);
    on(document, 'mouseup', this.onMouseUp);
    on(document, 'touchmove', this.onTouchMove);
    on(document, 'touchend', this.onTouchEnd);
  }

  unbindEvents () {
    off(document, 'mousemove', this.onMouseMove);
    off(document, 'mouseup', this.onMouseUp);
    off(document, 'touchmove', this.onTouchMove);
    off(document, 'touchend', this.onTouchEnd);
  }

  onMouseMove = (event) => {
    this.onMoveEvent(event.pageX, event.pageY);
  };

  onTouchMove = (event) => {
    this.onMoveEvent(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
  };

  onMouseUp = this.stopScratching;
  onTouchEnd = this.stopScratching;

  onMoveEvent = (docX, docY) => {
    const {el} = this;

    if (!el) {
      return;
    }

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const {left, top} = el.getBoundingClientRect();
      const elX = left + window.scrollX;
      const elY = top + window.scrollY;
      const x = docX - elX;
      const y = docY - elY;

      this.setState({
        dx: x - this.state.x,
        dy: y - this.state.y,
        end: Date.now(),
      }, () => {
        this.props.onScratch(this.state);
      });
    });
  };

  render () {
    const {disabled, bond} = this.props;

    if (bond) {
      const bondName: string = typeof bond === 'string' ? bond : 'bond';
      const state: IScratchSensorStateWithBond = {...this.state};

      if (!disabled) {
        state[bondName] = {
          ref: this.ref(),
          onMouseDown: this.onMouseDown(),
          onTouchStart: this.onTouchStart(),
        };
      }

      return render(this.props, state);
    } else {
      let element = render(this.props, this.state);

      if (!disabled) {
        element = cloneElement(element, {
          ref: this.ref(element.ref),
          onMouseDown: this.onMouseDown(element.props.onMouseDown),
          onTouchStart: this.onTouchStart(element.props.onTouchStart),
        });
      }

      return element;
    }
  }
}

export const withScratch = createEnhancer(ScratchSensor, 'scratch');
