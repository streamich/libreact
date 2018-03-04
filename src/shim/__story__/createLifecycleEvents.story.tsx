import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {createLifecycleEvents} from '../createLifecycleEvents';
import ShowDocs from '../../../.storybook/ShowDocs';

const Lifecycles = createLifecycleEvents({
  willMount: action('willMount'),
  didMount: action('didMount'),
  willUnmount: action('willUnmount')
});

storiesOf('Shims/createLifecycleEvents()', module)
// .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/createLifecycleEvents.md')}))
  .add('Example', () =>
    <Lifecycles foo='bar'>
      <div>Hello world!</div>
    </Lifecycles>
  )
