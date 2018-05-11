import {h} from '../util';
import {WidthQuery} from '../WidthQuery';
import {WindowWidthSensor} from '../WindowWidthSensor';

export {View} from '../View';

export const WindowWidthQuery = (props) =>
  h(WindowWidthSensor, null,
    (state) => h(WidthQuery, state, props.children)
  );
