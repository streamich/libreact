import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {RenderInterval} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Animation/RenderInterval', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/RenderInterval.md')}))
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
        opacity: .1 + .9 * value,
        position: 'relative',
        top: (value * 100),
        left: 100
      }}>{value}</div>
    }</RenderInterval>
  </div>
)
.add('Entry with delay', () =>
  <div>
    <RenderInterval delay={1000} ms={2000}>{({value}) =>
      <div style={{
        width: 100,
        height: 100,
        background: 'tomato',
        opacity: .1 + .9 * value,
        position: 'relative',
        top: (value * 100),
        left: 100
      }}>{value}</div>
    }</RenderInterval>
  </div>
)
.add('Custom fps', () =>
  <div>
    <RenderInterval fps={10} ms={2000}>{({value}) =>
      <div style={{
        width: 100,
        height: 100,
        background: 'tomato',
        opacity: .1 + .9 * value,
        position: 'relative',
        top: (value * 100),
        left: 100
      }}>{value}</div>
    }</RenderInterval>
  </div>
)
