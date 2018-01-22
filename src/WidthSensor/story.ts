import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import WidthSensor from '.';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Sensors/WidthSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'WidthSensor'}))
  .add('Example', () =>
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
  );
