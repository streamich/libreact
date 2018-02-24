import {render, createEnhancer} from 'react-universal-interface';
import {Render, IRenderProps} from '../Render';
import {h} from '../util';
import {easing, TEasing, IEasingMap} from './easing';

export interface ITweenProps extends IRenderProps {
  easing?: (keyof IEasingMap) | [number, number, number, number] | ((time: number) => number);
  Render?: React.SFC<IRenderProps> | React.ComponentClass<IRenderProps>;
}

export const Tween: React.SFC<ITweenProps> = (props) => {
  let {easing: fn = 'linear'} = props;

  if (typeof props.easing === 'string') {
    fn = easing[fn as string];
  }

  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      console.error(
        '<Tween> expected "easing" property to be a valid easing function or a 4-tuple array or numbers ' +
        'specifying a Cubic Bezier curve, or a string specifying one of the built-int easing functions: ' +
        '"' + Object.keys(easing).join('", "') + '".'
      );
      console.trace();

      return null;
    }
  }

  return h(props.Render, props,
    ({value}) => render(props, {value: (fn as TEasing)(value)})
  );
};

Tween.defaultProps = {
  easing: 'linear',
  Render
};

export const withTween = createEnhancer(Tween, 'tween');
