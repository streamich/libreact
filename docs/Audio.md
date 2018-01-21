# `<Audio>`

FaCC that creates an `<audio>` element to play audio tracks, re-renders on audio state changes.

## Usage

```jsx
import {Audio} from 'mol-fe-react/lib/Audio';

<Audio autoPlay src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'>{(control, state) => {
  JSON.stringify(state, null, 4)
}}</Audio>
```

## Props

In addition to props below also accepts all [React's media events](https://reactjs.org/docs/events.html#media-events).

```tsx
export interface IAudioProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  noJs?: React.ReactElement<any>;
}
```

  - `src` - required, string, audio source file URL.
  - `autoPlay` - optional, boolean, whether to autoplay audio, defaults to `false`.
  - `loop` - optional, boolean, whether to repeat the track when it ends, defaults to `false`.
  - `muted` - optional, boolean, whether to mute the audio, defaults to `false`.
  - `preload` - optional, string, `<audio>` element preload attribute.
  - `volume` - optional, number, audio volume in `[0..1]` range, defaults to `1`.
  - `noJs` - optional, React element(s) to render insided the `<audio>` tag.

## Example

Play a sample audio track with control buttons.

```jsx
<Audio src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'>{(audio, state) =>
  <div>
    <button onClick={audio.play}>Play</button>
    <button onClick={audio.pause}>Pause</button>
    <button onClick={() => audio.seek(state.time - 5)}>Seek -</button>
    <button onClick={() => audio.seek(state.time + 5)}>Seek +</button>
    <button onClick={() => audio.volume(state.volume - 0.05)}>Volume -</button>
    <button onClick={() => audio.volume(state.volume + 0.05)}>Volume +</button>
    <button onClick={audio.mute}>Mute</button>
    <button onClick={audio.unmute}>Unmute</button>
  </div>
}</Audio>
```
