import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {WhenIdle} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Animation/WhenIdle', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/WhenIdle.md')}))
  .add('Defaults', () =>
    <WhenIdle>
      Hello world!
    </WhenIdle>
  )
  .add('Timeout prop', () =>
    <WhenIdle timeout={1}>
      Hello world!
    </WhenIdle>
  )
