import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Modal} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('UI/Modal', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Overlay.md')}))
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
