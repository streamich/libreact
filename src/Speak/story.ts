import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Speak} from '.';

storiesOf('Speak', module)
  .add('basic', () =>
    h(Speak, {
      text: 'Hello user, how are you today?'
    })
  );
