import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {WindowSizeSensor} from '.';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Sensors/WindowSizeSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'WindowSizeSensor'}))
  .add('Example', () =>
    h(WindowSizeSensor, {}, ({width, height}) =>
      h('div', {},
        `WIDTH: ${width}, HEIGHT: ${height}`
      )
    )
  );
