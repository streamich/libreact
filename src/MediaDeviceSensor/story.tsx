import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {MediaDeviceSensor} from '.';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Sensors/MediaDeviceSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'MediaDeviceSensor'}))
  .add('Example', () =>
    <div>
      <MediaDeviceSensor>{(state) =>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      }</MediaDeviceSensor>
    </div>
  );
