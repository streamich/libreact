import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {Dimmer} from '..';
import {Toggle} from '../../Toggle';
import ShowDocs from '../../ShowDocs'

storiesOf('UI/Dimmer', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Dimmer.md')}))
  .add('Example', () =>
    <div style={{width: 500, height: 300, border: '1px solid tomato', position: 'absolute'}}>
      Inline...
      <Dimmer>
        Children...
      </Dimmer>
    </div>
  )
  .add('Multiple sibling nodes', () =>
    <div style={{width: 500, height: 300, border: '1px solid tomato', position: 'absolute'}}>
      <div>
        Sibling 1
      </div>
      <div>
        Sibling 2
      </div>
      <Dimmer>
        Children...
      </Dimmer>
      <div>
        Sibling 3
      </div>
    </div>
  )
  .add('hidden=', () =>
    <div style={{width: 500, height: 300, border: '1px solid tomato', position: 'absolute'}}>
      Inline...
      <Dimmer hidden>
        Children...
      </Dimmer>
    </div>
  )
  .add('Toggle', () =>
    <Toggle>{({on, toggle}) =>
      <div>
        <div style={{width: 500, height: 300, border: '1px solid tomato', position: 'absolute'}}>
          Inline...
          <Dimmer hidden={!on}>
            Children...
          </Dimmer>
        </div>
        <button onClick={toggle}>Toggle: {on ? 'on' : 'off'}</button>
      </div>
    }</Toggle>
  )
