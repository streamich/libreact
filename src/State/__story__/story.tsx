import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {State} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Basic/State', module)
  .add('Documentation', () => h(ShowDocs, {name: 'State'}))
  .add('Basic example', () =>
    <State init={{cnt: 0}}>{({cnt}, set) =>
      <div
        style={{
          width: 100,
          height: 100,
          border: '1px solid tomato',
          fontSize: '70px',
          lineHeight: '100px',
          textAlign: 'center'
        }}
        onClick={() => set({cnt: cnt + 1})}
      >
        {cnt}
      </div>
    }</State>
  );