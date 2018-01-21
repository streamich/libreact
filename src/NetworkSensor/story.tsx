import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {NetworkSensor, withNetwork} from '.';

const NetworkStatus = withNetwork((props) =>
  <pre style={{fontFamily: 'monospace'}}>
    {JSON.stringify(props, null, 4)}
  </pre>
);

storiesOf('Sensors/NetworkSensor', module)
  .add('basic', () =>
    h(NetworkSensor, {}, (state) =>
      h('pre', {style: {
        fontFamily: 'monospace'
      }},
        JSON.stringify(state, null, 4)
      )
    )
  )
  .add('withNetwork', () => h(NetworkStatus));
