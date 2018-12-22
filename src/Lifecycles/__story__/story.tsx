import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Lifecycles} from '..';
import ShowDocs from '../../ShowDocs';

storiesOf('Inversion/Lifecycles', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Lifecycles.md')}))
  .add('Example', () =>
    <Lifecycles
      didMount={action('didMount')}
      willUnmount={action('willUnmount')}
    >
      <div>Hello world!</div>
    </Lifecycles>
  )
