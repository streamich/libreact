import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {IdleSensor, withIdle} from '..';
import ShowDocs from '../../ShowDocs';

const Print = ({idle}) =>
  <div>
    Is idle: {idle ? 'TRUE' : 'FALSE'}
  </div>;

const Hoc1 = withIdle(Print, '', {ms: 3000});

storiesOf('Sensors/IdleSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/IdleSensor.md')}))
  .add('FaCC - 2 sec', () =>
    <IdleSensor ms={2000}>{({idle}) =>
      <div>
        Is idle: {idle ? 'TRUE' : 'FALSE'}
      </div>
    }</IdleSensor>
  )
  .add('HOC - 3 sec', () => <Hoc1 />)
  .add('Only .onChange() - 2 sec', () => <IdleSensor ms={2000} onChange={action('onChange')} />)
