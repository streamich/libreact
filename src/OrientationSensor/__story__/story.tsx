import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {OrientationSensor, withOrientation} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

const Print = ({orientation}) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(orientation, null, 4)}
  </pre>;

const PrintOrientation = withOrientation(Print);

storiesOf('Sensors/OrientationSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'OrientationSensor'}))
  .add('FaCC', () =>
    <OrientationSensor>{(state) =>
      <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(state, null, 4)}</pre>
    }</OrientationSensor>
  )
  .add('HOC', () => <PrintOrientation />);
