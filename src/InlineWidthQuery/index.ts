import {h} from '../util';
import {WidthQuery} from '../WidthQuery';
import {SizeSensor} from '../SizeSensor';

export {View} from '../View';

export const InlineWidthQuery = (props) =>
  h(SizeSensor, null, (state) =>
    h('div', null,
      h(WidthQuery, state, props.children)
    )
  );
