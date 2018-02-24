import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {RenderInterval} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Animation/RenderInterval', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Overlay.md')}))
  .add('Defaults', () =>
    <div>
      <RenderInterval>{({value}) =>
        <div>{value}</div>
      }</RenderInterval>
    </div>
  )
  .add('Entry animation', () =>
    <div>
      <RenderInterval ms={2000}>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 100) - 100,
          left: 100
        }}>{value}</div>
      }</RenderInterval>
    </div>
  )
