# `MediaSensor`

FaCC that re-renders on [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) changes.

## Example

```jsx
import {MediaSensor} from 'libreact/lib/MediaSensor';

<MediaSensor query='(min-width: 480px)'>{(matches) =>
  `WIDTH IS GREATED THAN 480PX: ${matches}`
}</MediaSensor>
```
