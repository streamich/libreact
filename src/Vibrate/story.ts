import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Vibrate} from '.';

storiesOf('Vibrate', module)
  .add('single', () =>
    h(Vibrate, {ms: 200})
  )
  .add('sequence', () =>
    h(Vibrate, {ms: [100, 100, 100, 100, 100]})
  );
