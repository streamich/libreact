import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {MotionSensor, withMotion} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

const Print = ({motion}) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(motion, null, 4)}
  </pre>;

const Hoc = withMotion(Print);

storiesOf('Sensors/MotionSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'MotionSensor'}))
  .add('FaCC', () =>
    <MotionSensor>{(state) =>
      <pre style={{fontFamily: 'monospace'}}>{JSON.stringify(state, null, 4)}</pre>
    }</MotionSensor>
  )
  .add('HOC', () => <Hoc />);
