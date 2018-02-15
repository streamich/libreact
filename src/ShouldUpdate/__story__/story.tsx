import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ShouldUpdate} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import {Example1} from './Example1';

storiesOf('Inversion/ShouldUpdate', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ShouldUpdate.md')}))
  .add('Renders children', () =>
    h(ShouldUpdate, {when: () => false, props: {}},
      h('div', {}, 'Hello foobar!')
    )
  )
  .add('When greater than 3', () => <Example1 />)
