import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {WidthSensor, withWidth} from '..';
import ShowDocs from '../../ShowDocs'

const Print = (props) => h('pre', {
  style: {fontFamily: 'monospace'}
}, JSON.stringify(props, null, 4));

const Hoc1 = withWidth(Print);
const Hoc2 = withWidth(Print, 'mySize');
const Hoc3 = withWidth(Print, '');

storiesOf('Sensors/WidthSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/WidthSensor.md')}))
  .add('Example', () =>
    h('div', {},
      h(WidthSensor, {
        onWidth: action('onWidth')
      }, ({width, height}) =>
        h('div', {
          style: {
            border: '1px solid red'
          }
        },
          `WIDTH: ${width}, HEIGHT: ${height}`
        )
      )
    )
  )
  .add('HOC 1', () => h(Hoc1))
  .add('HOC 2', () => h(Hoc2))
  .add('HOC 3', () => h(Hoc3));
