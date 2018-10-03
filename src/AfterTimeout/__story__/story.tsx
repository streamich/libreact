import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {AfterTimeout} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Animation/AfterTimeout', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/AfterTimeout.md')}))
  .add('Defaults', () =>
    <AfterTimeout>
      Hello world!
    </AfterTimeout>
  )
  .add('Two second delay', () =>
    <div>
      <AfterTimeout ms={2000}>
        <div>Hello world!</div>
      </AfterTimeout>
    </div>
  )
