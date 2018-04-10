import {cloneElement} from 'react';
import {h} from '../util';
import {Value} from '../Value';
import renderProp from '../util/renderProp';
import faccToHoc from '../util/faccToHoc';

export interface IFocusSensorProps {
  bond?: boolean | string;
}

export const FocusSensor: React.StatelessComponent<IFocusSensorProps> = (props: IFocusSensorProps) => {
  let {bond} = props;

  return Value({
    render: ({value, set}) => {
      if (bond) {
        if (typeof bond === 'boolean') {
          bond = 'bond';
        }

        return renderProp(props, {
          isFocused: value,
          [bond]: {
            onFocus: () => set(true),
            onBlur: () => set(false),
          }
        });
      } else {
        const element = renderProp(props, {
          isFocused: value
        });

        return cloneElement(element, {
          onFocus: () => set(true),
          onBlur: () => set(false),
        });
      }
    }
  });
};

const FocusSensorWithBond = (props) => h(FocusSensor, {
  bond: true,
  ...props
});

export const withFocus = faccToHoc(FocusSensorWithBond, 'focus');
