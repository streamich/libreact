import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Slider} from '..';
import ShowDocs from '../../../.storybook/ShowDocs';

storiesOf('Other/Slider', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/MouseSensor.md')}))
  .add('Example', () =>
    <Slider>{(state) =>
      <div style={{
        width: 800,
        height: 80,
        border: '1px solid tomato'
      }}>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
      </div>
    }</Slider>
  );
