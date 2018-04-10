import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {createLifecycleEvents} from '../createLifecycleEvents';

const Lifecycles = createLifecycleEvents({
  willMount: action('willMount'),
  didMount: action('didMount'),
  willUnmount: action('willUnmount')
});

storiesOf('Shims/createLifecycleEvents()', module)
  .add('Example', () =>
    <Lifecycles foo='bar'>
      <div>Hello world!</div>
    </Lifecycles>
  )
