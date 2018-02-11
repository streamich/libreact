import {Component, cloneElement} from 'react';
import {h} from '../util';
import {Value} from '../Value';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IActiveSensorProps {
  bond?: boolean | string;
}

export const ActiveSensor = (props: IActiveSensorProps) => {
  let {bond} = props;

  return Value({
    render: ({value, set}) => {
      if (bond) {
        if (typeof bond === 'boolean') {
          bond = 'bond';
        }

        return renderProp(this.props, {
          isActive: value,
          [bond]: {
            onMouseDown: () => value(false),
            onMouseUp: () => value(true),
          }
        });
      } else {
        const element = renderProp(this.props, {
          isActive: value
        });

        return cloneElement(element, {
          onMouseDown: () => value(false),
          onMouseUp: () => value(true),
        });
      }
    }
  });
};

const ActiveSensorWithBond = (props) => h(ActiveSensor, {
  bond: true,
  ...props
});

export const withActive = faccToHoc(ActiveSensorWithBond, 'active');
