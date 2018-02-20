import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Ripple} from '..';
import ShowDocs from '../../../.storybook/ShowDocs';

storiesOf('UI/Ripple', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Slider.md')}))
  .add('Example', () =>
    <div>
      <Ripple>
        <div style={{
          width: 300,
          height: 200,
          lineHeight: '200px',
          textAlign: 'center',
          background: 'white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, .1)',
        }}>
          foobar
        </div>
      </Ripple>
    </div>
  )

