import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Video} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

const src = 'http://dailym.ai/2rG7TBS';

storiesOf('Generators/Video', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/Video.md')}))
  .add('Example', () =>
    <Video autoPlay style={{
      width: 400,
      border: '1px solid tomato'
    }} src={src}>{({video}, {isPlaying}) =>
      <div>
        {video}
      </div>
    }</Video>
  )
  .add('Basic controls', () =>
    <Video
      src={src}
      style={{
        width: 400,
        border: '1px solid tomato'
      }}
      render={({video, play, pause, seek, volume, mute, unmute}, {isPlaying}) =>
        <div>
          {video}
          <br />
          <button onClick={() => isPlaying ? pause() : play()}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      }
    />
  )
  .add('All control buttons', () =>
    <Video
      src={src}
      style={{
        width: 400,
        border: '1px solid tomato'
      }}
      render={({video, play, pause, seek, volume, mute, unmute}, state) =>
        <div>
          {video}
          <br />
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
          <button onClick={() => seek(state.time - 5)}>Seek -</button>
          <button onClick={() => seek(state.time + 5)}>Seek +</button>
          <button onClick={() => volume(state.volume - 0.05)}>Volume -</button>
          <button onClick={() => volume(state.volume + 0.05)}>Volume +</button>
          <button onClick={mute}>Mute</button>
          <button onClick={unmute}>Unmute</button>

          <pre style={{fontFamily: 'monospace'}}>
            {JSON.stringify(state, null, 4)}
          </pre>
        </div>
      }
    />
  )
  .add('No render props', () =>
    <Video
      src={src}
      autoPlay
      style={{
        width: 400,
        border: '1px solid tomato'
      }}
    />
  );
