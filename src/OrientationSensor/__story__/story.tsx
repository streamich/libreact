import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {OrientationSensor, withOrientation} from '..';
import ShowDocs from '../../ShowDocs'

const Print = ({orientation}) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(orientation, null, 4)}
  </pre>;

const PrintOrientation = withOrientation(Print);

storiesOf('Sensors/OrientationSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/OrientationSensor.md')}))
  .add('FaCC', () =>
    <OrientationSensor>{(state) =>
      <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(state, null, 4)}</pre>
    }</OrientationSensor>
  )
  .add('HOC', () => <PrintOrientation />);
