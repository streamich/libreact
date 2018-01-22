import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {LightSensor} from '.';
import {readFileSync} from 'fs';
import ShowDocs from '../../.storybook/ShowDocs'

storiesOf('Sensors/LightSensor', module)
  .add('Documentation', () => <ShowDocs name='LightSensor' />)
  .add('Example', () =>
    <LightSensor>{(light) =>
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(light, null, 4)}
      </pre>
    }</LightSensor>
  );
