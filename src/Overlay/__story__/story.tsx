import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Overlay} from '..';
import ShowDocs from '../../ShowDocs'

storiesOf('UI/Overlay', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Overlay.md')}))
  .add('Basic example', () =>
    <div>
      <div style={{width: 100, height: 100, background: 'tomato'}} />
      <Overlay>
        foobar
      </Overlay>
    </div>
  )
  .add('Sample modal', () =>
    <div>
      <Overlay color='tomato' onClick={action('onClick')}>
        <div
          style={{
            width: 300,
            height: 200,
            background: '#fff',
            borderRadius: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,.3)',
            padding: 30,
          }}
        >
          foobar
        </div>
      </Overlay>
    </div>
  )
  .add('Double modal', () =>
    <div>
      <Overlay>
        <div
          style={{
            width: 600,
            height: 400,
            background: '#fff',
            borderRadius: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,.3)',
            padding: 30,
          }}
        >
          First
        </div>
      </Overlay>
      <Overlay>
        <div
          style={{
            width: 300,
            height: 200,
            background: '#fff',
            borderRadius: 4,
            boxShadow: '0 2px 4px rgba(0,0,0,.3)',
            padding: 30,
          }}
        >
          Second
        </div>
      </Overlay>
    </div>
  )
  .add('No animation', () =>
    <div>
      <Overlay time={0}>
        foobar
      </Overlay>
    </div>
  )
  .add('Button underneath', () =>
    <div>
      <button onClick={() => alert('CLICKED')}>Click me!</button>
      <Overlay>
        foobar
      </Overlay>
    </div>
  )
  .add('With inputs', () =>
    <div>
      <button onClick={() => alert('CLICKED')}>Click me!</button>
      <Overlay>
        <div style={{background: 'white'}}>
          This is modal...
          <button>OK</button>
          <button>Cancel</button>
        </div>
      </Overlay>
    </div>
  )
