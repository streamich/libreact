import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Alert} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Generators/Alert', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Alert.md')}))
  .add('Basic example', () => <Alert show text='Hello world' />)
  .add('Don\'t show', () => <Alert show={false} text='You shall not see this' />);
