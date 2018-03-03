import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Dimmable} from '..';
import {Toggle} from '../../Toggle';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('UI/Dimmable', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Dimmable.md')}))
  .add('Text node', () =>
    <Toggle>{({on, toggle}) =>
      <div>
        <Dimmable dim={on}>
          <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
            Inline...
          </div>
        </Dimmable>
        <div onClick={toggle}>Toggle: {on ? 'on' : 'off'}</div>
      </div>
    }</Toggle>
  )
  .add('Single child', () =>
    <Toggle>{({on, toggle}) =>
      <div>
        <Dimmable dim={on}>
          <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
            <div>
              Single child node...
            </div>
          </div>
        </Dimmable>
        <div onClick={toggle}>Toggle: {on ? 'on' : 'off'}</div>
      </div>
    }</Toggle>
  )
  .add('Multi children', () =>
    <Toggle>{({on, toggle}) =>
      <div>
        <Dimmable dim={on}>
          <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
            <div>
              Node 1
            </div>
            <div>
              Node 2
            </div>
          </div>
        </Dimmable>
        <div onClick={toggle}>Toggle: {on ? 'on' : 'off'}</div>
      </div>
    }</Toggle>
  )
  .add('Warning "position"', () =>
    <Dimmable>
      <div style={{width: 500, height: 300, border: '1px solid tomato', position: 'absolute'}}>
        Inline...
      </div>
    </Dimmable>
  )
