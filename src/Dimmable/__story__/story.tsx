import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Dimmable} from '..';
import {Toggle} from '../../Toggle';
import ShowDocs from '../../ShowDocs'

storiesOf('UI/Dimmable', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Dimmable.md')}))
  .add('Text node', () =>
    <Toggle>{({on, toggle}) =>
      <div>
        <Dimmable dim={on} ms={2000}>
          <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
            Inline...
          </div>
        </Dimmable>
        <button onClick={toggle}>Toggle: {on ? 'on' : 'off'}</button>
      </div>
    }</Toggle>
  )
  .add('Single child', () =>
    <Toggle>{({on, toggle}) =>
      <div>
        <Dimmable dim={on}>
          <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
            <div style={{filter: 'grayscale(100%)'}}>
              Single child node...
            </div>
          </div>
        </Dimmable>
        <button onClick={toggle}>Toggle: {on ? 'on' : 'off'}</button>
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
        <button onClick={toggle}>Toggle: {on ? 'on' : 'off'}</button>
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
  .add('renderOverlay', () =>
    <Dimmable dim renderOverlay={() => 'Hello'}>
      <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
        Inline...
      </div>
    </Dimmable>
  )
  .add('Set color', () =>
    <Dimmable color='rgba(255, 255, 255, .3)' ms={2000} dim renderOverlay={() => 'Hello'}>
      <div style={{width: 500, height: 300, border: '1px solid tomato'}}>
        Inline...
      </div>
    </Dimmable>
  )
