import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Audio} from '.';
import ShowDocs from '../../.storybook/ShowDocs'

const src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

storiesOf('Generators/Audio', module)
  .add('Documentation', () => h(ShowDocs, {name: 'Audio'}))
  .add('Example', () =>
    <Audio autoplay src={src}>{(audio) =>
      <div>
        Hello audio!
      </div>
    }</Audio>
  )
  .add('With controls', () =>
    <Audio src={src}>{({play, pause}) =>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    }</Audio>
  )
  .add('Show state', () =>
    <Audio src={src}>{(audio, state) =>
      <div>
        <button onClick={audio.play}>Play</button>
        <button onClick={audio.pause}>Pause</button>
        <button onClick={() => audio.seek(state.time - 5)}>Seek -</button>
        <button onClick={() => audio.seek(state.time + 5)}>Seek +</button>
        <button onClick={() => audio.volume(state.volume - 0.05)}>Volume -</button>
        <button onClick={() => audio.volume(state.volume + 0.05)}>Volume +</button>
        <button onClick={audio.mute}>Mute</button>
        <button onClick={audio.unmute}>Unmute</button>
        <pre style={{fontFamily: 'monospace'}}>
          {JSON.stringify(state, null, 4)}
        </pre>
        <hr />
        <pre style={{fontFamily: 'monospace'}}>
          {`
<Audio src={src}>{(audio, state) =>
  <div>
    <button onClick={audio.play}>Play</button>
    <button onClick={audio.pause}>Pause</button>
    <button onClick={() => audio.seek(state.time - 5)}>Seek -</button>
    <button onClick={() => audio.seek(state.time + 5)}>Seek +</button>
    <button onClick={() => audio.volume(state.volume - 0.05)}>Volume -</button>
    <button onClick={() => audio.volume(state.volume + 0.05)}>Volume +</button>
    <button onClick={audio.mute}>Mute</button>
    <button onClick={audio.unmute}>Unmute</button>
    <pre style={{fontFamily: 'monospace'}}>
      {JSON.stringify(state, null, 4)}
    </pre>
  </div>
}</Audio>
          `}
        </pre>
      </div>
    }</Audio>
  );
