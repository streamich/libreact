# `<DropArea>`

Catches file and text drop and paste events.


## Usage

```jsx
import {DropArea} from 'libreact/lib/DropArea';

<DropArea
  onFiles={(files, event) => console.log(files)}
  onUri={(uri, event) => console.log(uri)}
  onText={(text, event) => console.log(text)}
>
  <div style={{border: '1px solid tomato'}}>
    Drop it like a bomb!
  </div>
</DropArea>
```


## Props

- `onFiles` &mdash; called when files are dropped or pasted into the area.
- `onUri` &mdash; called an URI from another tab is dropped in the area.
- `onText` &mdash; called when text is paste in the area.
