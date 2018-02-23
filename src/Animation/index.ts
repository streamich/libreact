import {render, createEnhancer} from 'react-universal-interface';
import {Tween, ITweenProps} from '../Tween';
import {h} from '../util';

export interface IAnimationProps extends ITweenProps {
  map: {[key: string]: [number, number]};
}

export const Animation: React.SFC<IAnimationProps> = (props) => {
  return h(Tween, props,
    ({value}) => {
      const {map} = props;
      const keys = Object.keys(map);
      const interpolated = {};

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const [start, end] = map[key];
        const diff = end - start;

        interpolated[key] = diff * value + start;
      }

      render(props, interpolated);
    }
  );
};

export const withAnimation = createEnhancer(Animation, 'animation');
