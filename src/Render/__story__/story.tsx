import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Render} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Animation/Render', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Overlay.md')}))
  .add('Defaults', () =>
    <div>
      <Render>{({value}) =>
        <div>{value}</div>
      }</Render>
    </div>
  )
  .add('Entry animation', () =>
    <div>
      <Render ms={2000}>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 100) - 100,
          left: 100
        }}>{value}</div>
      }</Render>
    </div>
  )
