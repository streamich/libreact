import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {ExitSensor} from '..';
import ShowDocs from '../../ShowDocs'
import {StoryExitSensorExample} from './StoryExitSensorExample';

storiesOf('Sensors/ExitSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ExitSensor.md')}))
  .add('Example', () => <StoryExitSensorExample />)
  .add('Can display nothing', () =>
    <div>
      <ExitSensor></ExitSensor>
    </div>
  )
  .add('Shows error on invalid child', () =>
    <div>
      <ExitSensor>{'Hello' as any}</ExitSensor>
    </div>
  );
