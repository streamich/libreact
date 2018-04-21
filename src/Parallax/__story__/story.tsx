import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import StoryParallax1 from './StoryParallax1';
import StoryParallax2 from './StoryParallax2';
import StoryParallax3 from './StoryParallax3';
import StoryParallax4 from './StoryParallax4';
import StoryParallax5 from './StoryParallax5';

storiesOf('UI/Parallax', module)
  .add('Basic example', () => <StoryParallax1 />)
  .add('Card', () => <StoryParallax2 />)
  .add('With margin', () => <StoryParallax3 />)
  .add('Distance', () => <StoryParallax4 />)
  .add('Scroll slowdown', () => <StoryParallax5 />);
