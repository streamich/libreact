import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Lifecycles} from '..';
import {View} from '../../View';
import {WindowSizeSensor} from '../../WindowSizeSensor';
import ShowDocs from '../../../.storybook/ShowDocs';

storiesOf('Inversion/Lifecycles', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Lifecycle.md')}))
  .add('Example', () =>
    <Lifecycles
      foo='bar'
      willMount={action('willMount')}
      didMount={action('didMount')}
      willUnmount={action('willUnmount')}
    >
      <div>Hello world!</div>
    </Lifecycles>
  )
