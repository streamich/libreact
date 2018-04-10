import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {ClassNames} from '..';
import {Toggle} from '../../Toggle';

storiesOf('Side Effects/ClassNames', module)
  .add('Basic example', () =>
    <ClassNames list={['foobar']} />
  )
  .add('Toggle', () =>
    <Toggle>{({on, toggle}) =>
      <div>
        <div onClick={toggle}>Toggle: {on ? 'on' : 'off'}</div>
        {on && <ClassNames list={['foobar', 'baz']} />}
      </div>
    }</Toggle>
  )
