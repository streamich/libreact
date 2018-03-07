import {h} from '../util';
import {WidthQuery} from '../WidthQuery';
import {WindowSizeSensor} from '../WindowSizeSensor';

export const WindowWidthQuery = (props) => h(WindowSizeSensor, null, (state) => h(WidthQuery, state, props.children));
