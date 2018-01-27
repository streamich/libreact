import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Toggle} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

storiesOf('Basic/Toggle', module)
  .add('Documentation', () => h(ShowDocs, {name: 'Toggle'}))
  .add('Example', () =>
    <Toggle init={true}>{(on, toggle) =>
      <div onClick={toggle}>
        <input type='checkbox' checked={on} />
        Toggle me!
      </div>
    }</Toggle>
  );
