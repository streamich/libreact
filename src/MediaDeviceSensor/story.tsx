import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {MediaDeviceSensor} from '.';

storiesOf('MediaDeviceSensor', module)
  .add('basic', () =>
    <div>
      <MediaDeviceSensor>{(state) =>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      }</MediaDeviceSensor>
    </div>
  );
