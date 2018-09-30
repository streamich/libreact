import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Render} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Animation/Render', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Render.md')}))
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
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 100),
          left: 100
        }}>{value}</div>
      }</Render>
    </div>
  )
  .add('Entry with delay', () =>
    <div>
      <Render delay={1000} ms={2000}>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 100),
          left: 100
        }}>{value}</div>
      }</Render>
    </div>
  )
