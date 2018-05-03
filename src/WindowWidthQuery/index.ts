import {h} from '../util';
import {WidthQuery} from '../WidthQuery';
import {WindowSizeSensor} from '../WindowSizeSensor';

export {View} from '../View';

export const WindowWidthQuery = (props) =>
  h(WindowSizeSensor, null,
    (state) => h(WidthQuery, state, props.children)
  );
