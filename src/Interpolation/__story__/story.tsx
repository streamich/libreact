import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Interpolation} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Animation/Interpolation', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Overlay.md')}))
  .add('Defaults', () =>
    <div>
      <Interpolation ms={1000} map={{foo: [1, 10]}}>{({foo}) =>
        <div>{foo}</div>
      }</Interpolation>
    </div>
  )