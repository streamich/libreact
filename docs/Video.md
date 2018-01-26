# `<Video>`

FaCC that creates a `<video>` element to play video media, re-renders on video state changes.

## Usage

```jsx
import {Video} from 'libreact/lib/Video';

<Video autoPlay src='http://dailym.ai/2rG7TBS'>{(actions, state) => {
  JSON.stringify(state, null, 4)
}}</Video>
```


## Props

In addition to props below also accepts all [React's media events](https://reactjs.org/docs/events.html#media-events).

```tsx
interface IVideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  noJs?: React.ReactElement<any>;
}
```

  - `src` - required, string, video source file URL.
  - `autoPlay` - optional, boolean, whether to autoplay media, defaults to `false`.
  - `loop` - optional, boolean, whether to repeat the media when it ends, defaults to `false`.
  - `muted` - optional, boolean, whether to mute the media, defaults to `false`.
  - `preload` - optional, string, `<video>` element preload attribute.
  - `volume` - optional, number, media volume in `[0..1]` range, defaults to `1`.
  - `noJs` - optional, React element(s) to render insided the `<video>` tag.
  - `onMount` - optional, callback, called when component mounts, receives `IVideo` as the first argument.
  - `onUnmount` - optional, callback, called when component un-mounts, receives `IVideo` as the first argument.


## Arguments

The `children` function receives two arguments, first is the `IVideo` *actions* collection and the second
is the state of the video component.

```jsx
<Video autoPlay src={src}>{({video, ...actions}, state) =>

}</Video>
```

First argument is the `<Video>` component instance with the following public signature.

```ts
interface IVideo {
  el: HTMLVideoElement;
  video: React.ReactElement;
  play();
  pause();
  seek(time: number);
  volume(value: number);
  mute();
  unmute();
}
```

, where

  - `el` - `<video>` element DOM node.
  - `video` - `<video>` element React node, that you have to insert in the JSX tree.

The second argument is the state of the `<Video>` component with the following signature.

```ts
interface IVideoState {
  buffered?: TRange[];
  time?: number;
  duration?: number;
  isPlaying?: boolean;
  muted?: boolean;
  volume?: number;
}

type TRange = {
  start: number;
  end: number;
};
```

, where

  - `buffered` - a list of ranges representing media intervals that have been buffered by the browser.
  - `time` - current time in seconds.
  - `duration` - total video duration in seconds.
  - `isPlaying` - whether the video is currently playing.
  - `muted` - whether `muted` attribute is set on the video element.
  - `volume` - current volume in range `[0..1]`.


## Example

Play a sample video.

```jsx
<Video
  src='http://dailym.ai/2rG7TBS'
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
```
