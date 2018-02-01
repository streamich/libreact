# `<FullScreen>`

Displays child elements full-screen.

## Usage

```jsx
import {FullScreen} from 'libreact/lib/FullScreen';

<FullScreen on={on}>
  Hello world!
</FullScreen>
```

## Props

Props have the following signature

```ts
interface IFullScreenProps {
  on: boolean;
  video?: HTMLVideoElement;
  innerRef?: (el) => void;
  onClose?: () => void;
  tag?: keyof React.ReactHTML;
}
```

, where

  - `on` - required, boolean, whether to display element in full screen or inline.
  - `video` - optional, DOM video element to try to display that video in full screen using alternative `.webkitEnterFullscreen()`
  available only on `HTMLVideoElement`. That way video element will get displayed full screen. Only used when regular full screen
  API is not available.
  - `innerRef` - optional, callback that receives the root element reference.
  - `onClose` - optional, callback, called when full screen is exited.
  - `tag` - optional, string, specifying tag name to use for root element, defaults to `div`.
