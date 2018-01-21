import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {MediaSensor} from '.';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Sensors/MediaSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'MediaSensor'}))
  .add('Example', () =>
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
