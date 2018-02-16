import {Component, cloneElement} from 'react';
import {h} from '../util';
import {Value} from '../Value';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IActiveSensorProps {
  bond?: boolean | string;
}

export const ActiveSensor: React.StatelessComponent<IActiveSensorProps> = (props: IActiveSensorProps) => {
  let {bond} = props;

  return Value({
    render: ({value, set}) => {
      if (bond) {
        if (typeof bond === 'boolean') {
          bond = 'bond';
        }

        return renderProp(props, {
          isActive: value,
          [bond]: {
            onMouseDown: () => set(true),
            onMouseUp: () => set(false),
            onMouseLeave: () => set(false),
          }
        });
      } else {
        const element = renderProp(props, {
          isActive: value
        });

        return cloneElement(element, {
          onMouseDown: () => set(true),
          onMouseUp: () => set(false),
          onMouseLeave: () => set(false),
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
