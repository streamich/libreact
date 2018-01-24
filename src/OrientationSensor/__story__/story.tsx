import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {OrientationSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Sensors/OrientationSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'OrientationSensor'}))
  .add('Example', () =>
    <OrientationSensor>{(state) =>
      <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(state, null, 4)}</pre>
    }</OrientationSensor>
  );
