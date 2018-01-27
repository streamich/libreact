import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Mailto} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import {invert} from '../../invert';

storiesOf('Other/Mailto', module)
  .add('Documentation', () => h(ShowDocs, {name: 'Mailto'}))
  .add('Example', () => <Mailto email='foo@bar.baz'>Click me!</Mailto>);
