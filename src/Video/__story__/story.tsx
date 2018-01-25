import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Video} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

const src = 'http://video.dailymail.co.uk/video/mol/2017/10/03/4242224567792913009/1024x576_MP4_4242224567792913009.mp4';

storiesOf('Generators/Video', module)
  .add('Documentation', () => h(ShowDocs, {name: 'Video'}))
  .add('Example', () =>
    <Video autoPlay style={{
      width: 400,
      border: '1px solid tomato'
    }} src={src}>{({video}, {isPlaying}) =>
      <div>
        {video}
      </div>
    }</Video>
  );
