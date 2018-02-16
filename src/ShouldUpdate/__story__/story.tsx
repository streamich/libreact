import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {ShouldUpdate, shouldUpdate} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import {Example1} from './Example1';
import {Example2} from './Example2';
import {Example3} from './Example3';
import {Example4} from './Example4';

storiesOf('Inversion/ShouldUpdate', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ShouldUpdate.md')}))
  .add('Renders children', () =>
    h(ShouldUpdate, {when: () => false, props: {}},
      h('div', {}, 'Hello foobar!')
    )
  )
  .add('When greater than 3', () => <Example1 />)
  .add('Passes props', () => (
    <ShouldUpdate when={() => true} props={{foo: 'bar'}}>{({foo}) =>
      <div>
        {foo}
      </div>
    }</ShouldUpdate>
  ))
  .add('HOC - greater than 3', () => <Example2 />)
  .add('HOC - increments of 3', () => <Example3 />)
  .add('pure()', () => <Example4 />)
