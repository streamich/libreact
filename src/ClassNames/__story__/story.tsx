import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ClassNames} from '..';
import {Toggle} from '../../Toggle';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Side Effects/ClassNames', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ClassNames.md')}))
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
