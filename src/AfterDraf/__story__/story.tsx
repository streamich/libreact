import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {AfterDraf} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Animation/AfterDraf', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/AfterDraf.md')}))
  .add('Defaults', () =>
    <AfterDraf>
      Hello world!
    </AfterDraf>
  )
