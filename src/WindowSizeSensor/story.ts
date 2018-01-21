import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {WindowSizeSensor} from '.';

storiesOf('Sensors/WindowSizeSensor', module)
  .add('basic', () =>
    h(WindowSizeSensor, {}, ({width, height}) =>
      h('div', {},
        `WIDTH: ${width}, HEIGHT: ${height}`
      )
    )
  );
