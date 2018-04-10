import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Modal} from '..';
import {Toggle} from '../../Toggle';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('UI/Modal', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Modal.md')}))
  .add('Basic example', () =>
    <div>
      <Modal>
        foobar
      </Modal>
    </div>
  )
  .add('Button underneath', () =>
    <div>
      <button onClick={() => alert('CLICKED')}>Click me!</button>
      <Modal>
        foobar
      </Modal>
    </div>
  )
  .add('With inputs', () =>
    <div>
      <button onClick={() => alert('CLICKED')}>Click me!</button>
      <Modal>
        <div style={{background: 'white'}}>
          This is modal...
          <button>OK</button>
          <button>Cancel</button>
        </div>
      </Modal>
    </div>
  )
  .add('Modal UI', () =>
    <div>
      <Modal color='tomato' onClick={action('onClick')} onEsc={action('onEsc')}>
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
      </Modal>
    </div>
  )
  .add('Toggle', () =>
    <div>
      <Toggle>{({on, toggle}) =>
        <div>
          <button onClick={toggle}>Open dialog</button>
          {on && <Modal color='rgba(0,0,0,.3)' onClick={toggle} onEsc={toggle}>
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
          </Modal>}
        </div>
      }</Toggle>
    </div>
  )
