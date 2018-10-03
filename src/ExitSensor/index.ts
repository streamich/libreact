import * as React from 'react';

export interface IExitSensorProps {
  children?: React.ReactElement<any>;
  time?: number;
}

export interface IExitSensorState {
}

export class ExitSensor extends React.Component<IExitSensorProps, IExitSensorState> {
  static defaultProps = {
    time: 200
  };

  element: React.ReactElement<any> = null;
  nextElement: React.ReactElement<any> = null;
  exitInFlight: boolean = false;
  exitFinish: boolean = false;
  timeout;

  componentWillUnmount () {
    clearTimeout(this.timeout);
  }

  transition = () => {
    this.exitFinish = true;
    this.forceUpdate();
  };

  render () {
    if (process.env.NODE_ENV !== 'production') {
      const {children} = this.props;

      if (children && (typeof children !== 'object')) {
        console.error(new TypeError(
          'ExitSensors expects a single ReactElement node as a child.'
        ));
      }
    }

    if (this.exitFinish) {
      this.exitFinish = false;
      this.exitInFlight = false;
      this.element = this.nextElement;

      return this.element || null;
    }

    const element = this.props.children;

    if (this.exitInFlight) {
      this.nextElement = element;

      return React.cloneElement(this.element, {
        exiting: true
      });
    }

    if (!this.element) {
      this.element = element;

      return element || null;
    }

    if (!element || (this.element.key !== element.key)) {
      this.exitInFlight = true;
      this.nextElement = element;

      this.timeout = setTimeout(this.transition, this.props.time);

      return React.cloneElement(this.element, {
        exiting: true
      });
    }

    return element || null;
  }
}
