import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import SizeSensor from '.';

storiesOf('Sensors/SizeSensor', module)
  .add('basic', () =>
    h(SizeSensor, {
      onSize: action('onSize')
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
