import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {WindowScrollSensor} from '.';

storiesOf('Sensors/WindowScrollSensor', module)
  .add('basic', () =>
    h('div', {style: {
      background: 'linear-gradient(to bottom, #fff 0%, #000 100%)',
      width: 5000,
      height: 5000
    }},
      h(WindowScrollSensor, {}, ({x, y}) =>
        h('div', {
          style: {
            border: '1px solid red',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%'
          }
        },
          `x: ${x}, y: ${y}`
        )
      )
    )
  );
