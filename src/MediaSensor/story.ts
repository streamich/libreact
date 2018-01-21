import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {MediaSensor} from '.';

storiesOf('Sensors/MediaSensor', module)
  .add('basic', () =>
    h(MediaSensor, {
      query: '(min-width: 480px)'
    }, (matches) =>
      h('div', {
        style: {
          border: '1px solid red'
        }
      },
        `WIDTH IS GREATED THAN 480PX: ${matches}`
      )
    )
  );
