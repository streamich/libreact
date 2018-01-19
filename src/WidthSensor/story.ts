import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import WidthSensor from '.';

storiesOf('WidthSensor', module)
  .add('basic', () =>
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
