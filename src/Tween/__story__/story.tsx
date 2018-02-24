import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Tween} from '..';
import {AfterTimeout} from '../../AfterTimeout';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Animation/Tween', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Overlay.md')}))
  .add('Defaults', () =>
    <div>
      <Tween>{({value}) =>
        <div>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - default', () =>
    <div>
      <Tween ms={1000}>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - quadratic', () =>
    <div>
      <Tween ms={1000} easing='quadratic'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - cubic', () =>
    <div>
      <Tween ms={1000} easing='cubic'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - elastic', () =>
    <div>
      <Tween ms={1000} easing='elastic'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - circ', () =>
    <div>
      <Tween ms={1000} easing='circ'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inQuad', () =>
    <div>
      <Tween ms={1000} easing='inQuad'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - outQuad', () =>
    <div>
      <Tween ms={1000} easing='outQuad'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inOutQuad', () =>
    <div>
      <Tween ms={1000} easing='inOutQuad'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inCubic', () =>
    <div>
      <Tween ms={1000} easing='inCubic'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - outCubic', () =>
    <div>
      <Tween ms={1000} easing='outCubic'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inQuart', () =>
    <div>
      <Tween ms={1000} easing='inQuart'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inQuint', () =>
    <div>
      <Tween ms={1000} easing='inQuint'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - custom', () =>
    <div>
      <Tween ms={1000} easing={t => t}>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('With <AfterTimeout>', () =>
    <div>
      <AfterTimeout ms={2000}>
        <Tween ms={1000} easing={t => t}>{({value}) =>
          <div style={{
            width: 100,
            height: 100,
            background: 'tomato',
            opacity: value,
            position: 'relative',
            top: (value * 300),
            left: 100
          }}>{value}</div>
        }</Tween>
      </AfterTimeout>
    </div>
  )
