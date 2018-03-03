import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Dimmer} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('UI/Dimmer', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Dimmer.md')}))
  .add('Example', () =>
    <div style={{width: 500, height: 300, border: '1px solid tomato', position: 'absolute'}}>
      <Dimmer>
        Children...
      </Dimmer>
    </div>
  )
