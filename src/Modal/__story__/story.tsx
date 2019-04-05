import {createElement as h} from 'react';
import {createPortal} from 'react-dom';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Modal} from '..';
import {Toggle} from '../../Toggle';
import ShowDocs from '../../ShowDocs'
import {AfterTimeout} from '../../AfterTimeout';

storiesOf('UI/Modal', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Modal.md')}))
  .add('Basic example', () =>
    <div>
      <Modal onElement={el => {
        el.style.background = 'red';
      }}>
        foobar
      </Modal>
    </div>
  )
  .add('Button underneath', () =>
    <div>
      <button onClick={() => alert('CLICKED')}>Click me!</button>
      {createPortal(
        <button onClick={() => alert('CLICKED')}>This should be blurred</button>,
        document.body
      )}
      {createPortal(
        <button data-modal-ignore="" onClick={() => alert('CLICKED')}>This element should not be blurred</button>,
        document.body
      )}
      <AfterTimeout>
        <Modal>
          foobar
        </Modal>
      </AfterTimeout>
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
  .add('Page scroll', () =>
    <div>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
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
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
      This is page content
      <br/>
    </div>
  )
