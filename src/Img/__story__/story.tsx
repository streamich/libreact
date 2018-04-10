import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Img} from '..';
// import ShowDocs from '../../../.storybook/ShowDocs';

storiesOf('UI/Img', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/IdleSensor.md')}))
  .add('<img>', () => <img src='http://placehold.it/120x120&text=image1' />)
  .add('Defaults', () => <Img src='http://placehold.it/120x120&text=image1' />)
