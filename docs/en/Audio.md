# `<Audio>`

FaCC that creates an `<audio>` element to play audio tracks, re-renders on audio state changes.

## Usage

```jsx
import {Audio} from 'libreact/lib/Audio';

<Audio autoPlay src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'>{(control, state) => {
  JSON.stringify(state, null, 4)
}}</Audio>
```


## Props

In addition to props below also accepts all [React's media events](https://reactjs.org/docs/events.html#media-events).

```tsx
interface IAudioProps {
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
  - `onMount` - optional, callback, called when component mounts, receives `IAudio` as the first argument.
  - `onUnmount` - optional, callback, called when component un-mounts, receives `IAudio` as the first argument.


## Arguments

The `children` function receives two arguments, `audio` instance as *controller* and `state`.

```jsx
<Audio autoPlay src={src}>{(audio, state) =>

}</Audio>
```

First argument is the `<Audio>` component instance with the following public signature.

```ts
interface IAudio {
  el: HTMLAudioElement;
  play();
  pause();
  seek(time: number);
  volume(value: number);
  mute();
  unmute();
}
```

, where

  - `el` - `<audio>` element DOM node.

The second argument is the state of the `<Audio>` component with the following signature.

```ts
interface IAudioState {
  time?: number;
  duration?: number;
  isPlaying?: boolean;
  muted?: boolean;
  volume?: number;
}
```

, where

  - `time` - current time in seconds.
  - `duration` - total audio track duration in seconds.
  - `isPlaying` - whether the audio track is currently playing.
  - `muted` - whether `muted` attribute is set on the audio element.
  - `volume` - current volume in range `[0..1]`.


## Example

Play a sample audio track with control buttons.

```jsx
<Audio src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'>
  {({play, pause, seek, volume, mute, unmute}, state) =>
    <div>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={() => seek(state.time - 5)}>Seek -</button>
      <button onClick={() => seek(state.time + 5)}>Seek +</button>
      <button onClick={() => volume(state.volume - 0.05)}>Volume -</button>
      <button onClick={() => volume(state.volume + 0.05)}>Volume +</button>
      <button onClick={mute}>Mute</button>
      <button onClick={unmute}>Unmute</button>
    </div>
  }
</Audio>
```
