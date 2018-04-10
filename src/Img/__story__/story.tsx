import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Img} from '..';
// import ShowDocs from '../../../.storybook/ShowDocs';

storiesOf('Sensors/IdleSensor', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/IdleSensor.md')}))
  .add('Defaults', () =>
    <Img src='https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg' />
  )
