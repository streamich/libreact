import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Audio} from '.';

storiesOf('Audio', module)
  .add('basic', () =>
    <Audio autoplay src='https://html5tutorial.info/media/vincent.mp3'>{(audio) =>
      <div>
        Hello audio!
      </div>
    }</Audio>
  );
