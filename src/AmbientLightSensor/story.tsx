import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {LightSensor} from '.';

storiesOf('LightSensor', module)
  .add('basic', () =>
    <LightSensor>{(light) =>
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify(light, null, 4)}
      </pre>
    }</LightSensor>
  );
