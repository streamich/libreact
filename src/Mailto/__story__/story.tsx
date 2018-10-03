import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Mailto} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Other/Mailto', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Mailto.md')}))
  .add('Example', () => <Mailto email='foo@bar.baz'>Click me!</Mailto>);
