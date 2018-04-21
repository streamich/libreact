import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import StoryParallax1 from './StoryParallax1';

storiesOf('UI/Parallax', module)
  .add('Basic example', () =>
    <StoryParallax1 onChange={action('onChange')} />);
