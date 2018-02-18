import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import SpinnerRotatePlane from '../SpinnerRotatePlane';
import ShowDocs from '../../../.storybook/ShowDocs';

storiesOf('Spinners', module)
  // .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Slider.md')}))
  .add('Example', () => <SpinnerRotatePlane />)
