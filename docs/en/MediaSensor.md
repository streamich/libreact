# `MediaSensor`

FaCC that re-renders on [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) changes.

## Example

```jsx
import {MediaSensor} from 'libreact/lib/MediaSensor';

<MediaSensor query='(min-width: 480px)'>{({matches}) =>
  `WIDTH IS GREATED THAN 480PX: ${matches}`
}</MediaSensor>
```


## `withMedia()`

Higher order component that injects a `media` prop into your component that specifies if media query matches.

```js
import {withMedia} from 'libreact/lib/MediaSensor';

const MyCompWithSize = withMedia(MyComp, 'isBigScreen', '(min-width: 480px)');
```


## `@withMedia`

Stateful component class decorator that injects a boolean prop into your component that specifies if media query matches.

```js
import {withMedia} from 'libreact/lib/MediaSensor';

@withMedia('isBigScreen', '(min-width: 480px)')
class MyComp extends Component {

}
```