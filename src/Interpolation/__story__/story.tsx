import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Interpolation} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('Animation/Interpolation', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Interpolation.md')}))
  .add('Defaults', () =>
    <div>
      <Interpolation ms={1000} map={{foo: [1, 10]}}>{({foo}) =>
        <div>{foo}</div>
      }</Interpolation>
    </div>
  )
  .add('Basic map', () =>
    <div>
        <Interpolation ms={1000} easing='inQuint' map={{
          left: [120, 300],
          top: [22, 322],
          opacity: [0, 1]
        }}>{({left, top, opacity}) =>
          <div style={{
            width: 100,
            height: 100,
            background: 'tomato',
            opacity,
            position: 'relative',
            top,
            left
          }}/>
        }</Interpolation>
    </div>
  )