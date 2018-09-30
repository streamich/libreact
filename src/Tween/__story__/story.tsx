import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Tween} from '..';
import {AfterTimeout} from '../../AfterTimeout';
import ShowDocs from '../../ShowDocs';
import createBezierEasing from '../createBezierEasing';

storiesOf('Animation/Tween', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Tween.md')}))
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - outCirc', () =>
    <div>
      <Tween ms={1000} easing='outCirc'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inCirc', () =>
    <div>
      <Tween ms={1000} easing='inCirc'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inOutCirc', () =>
    <div>
      <Tween ms={1000} easing='inOutCirc'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inExpo', () =>
    <div>
      <Tween ms={1000} easing='inExpo'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - outExpo', () =>
    <div>
      <Tween ms={1000} easing='outExpo'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inOutExpo', () =>
    <div>
      <Tween ms={1000} easing='inOutExpo'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inSine', () =>
    <div>
      <Tween ms={1000} easing='inSine'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - outSine', () =>
    <div>
      <Tween ms={1000} easing='outSine'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('Entry - inOutSine', () =>
    <div>
      <Tween ms={1000} easing='inOutSine'>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
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
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('With cubic-bezier', () =>
    <div>
      <Tween ms={1000} easing={createBezierEasing(0, 1.66, .75, .78)}>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
          position: 'relative',
          top: (value * 300),
          left: 100
        }}>{value}</div>
      }</Tween>
    </div>
  )
  .add('With delay', () =>
    <div>
      <Tween delay={2000} ms={1000}>{({value}) =>
        <div style={{
          width: 100,
          height: 100,
          background: 'tomato',
          opacity: .1 + .9 * value,
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
            opacity: .1 + .9 * value,
            position: 'relative',
            top: (value * 300),
            left: 100
          }}>{value}</div>
        }</Tween>
      </AfterTimeout>
    </div>
  )
