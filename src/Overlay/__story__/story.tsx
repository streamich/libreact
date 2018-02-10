import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Overlay} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Other/Overlay', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Overlay.md')}))
  .add('Basic example', () =>
    <div>
      <Overlay>
        foobar
      </Overlay>
    </div>
  )
  .add('Sample modal', () =>
    <div>
      <Overlay color='tomato'>
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
