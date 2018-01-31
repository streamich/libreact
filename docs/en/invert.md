# `invert()`

A utility function that inverts DOM element by creating a FaCC out of it. Allows you to easily
create stateless DOM components with reference to a DOM element and inverted control flow.

## Usage

```jsx
import {invert} from 'libreact/lib/invert';

const Div = invert('div');
const Audio = invert('audio');
const Video = invert('video');
// etc...

<Div
  onMount={(div, comp) => console.log('MOUNTED', div, comp)}
  onUnmount={(div, comp) => console.log('UNMOUNTED', div, comp)}
  onClick={(event, div, comp) => {}}
  wrapper={(jsx, comp) => <b>jsx</b>}
>{(comp) =>

}</Div>
```


## Reference

```tsx
invert: (tag?: string) => React.ComponentClass;
```

, where

  - `tag` - a DOM element tag name.

Returns an inverted FaCC of that tag, whose props are passed through to the DOM element and
it has these additional props:

  - `render` - optional, wrapper renderer that you can use to wrap your element in extra markup,
  defaults to `(element) => element`.
  - `onMounted(el, comp)` - called when component mounts; `el` - DOM element reference; `comp` - React
  component instance.
  - `onUnmount(comp)` - called when component unmounts; `comp` - React component instance.

Children of the created component can be a function that recieves a React component as its only argument.

The created react component instance has `.el` property which is a reference to the DOM element.


## `<Inverted>`

The default inverted element create for your convenience

```js
const Inverted = invert('div');
```

Although, by default, it is created as `<div>` element, it does not have to be a `<div>`. You can overwrite
tag name when you use it

```jsx
<Inverted tag='span' onMount={() => console.log('<span> mounted')}>
  Hello world!
<Inverted>
```


## Example

```jsx
import {invert} from 'libreact/lib/invert';

const Audio = invert('audio');

<Audio
  src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  onTimeUpdate={() => {}}
  render={(element, comp) =>
    <div>
      {element}
      <button onClick={() => comp.el.play()}>Play</button>
      <button onClick={() => comp.el.pause()}>Pause</button>
      <button onClick={() => comp.el.currentTime -= 5}>Seek -</button>
      <button onClick={() => comp.el.currentTime += 5}>Seek +</button>
      <button onClick={() => comp.el.volume -= 0.05}>Volume -</button>
      <button onClick={() => comp.el.volume += 0.05}>Volume +</button>
      <button onClick={() => comp.el.muted = true}>Mute</button>
      <button onClick={() => comp.el.muted = false}>Unmute</button>
      <pre style={{fontFamily: 'monospace'}}>
        {JSON.stringify({
          duration: comp.el && comp.el.duration,
          time: comp.el && comp.el.currentTime,
          volume: comp.el && comp.el.volume,
          muted: comp.el && comp.el.muted
        }, null, 4)}
      </pre>
    </div>
  }
/>
```