# `<Prompt>`

Uses [`Window.prompt()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) to get user input.

## Usage

Use it as a standalone compnent that returns result in `onResult` handler

```jsx
import {Prompt} from 'libreact/lib/Prompt';

<Prompt
  show
  message='Hello world'
  default='hello back'
  onResult={console.log}
/>
```

Or use it as a FaCC

```jsx
<Prompt
  show
  message='Hello world'
  default='hello back'
  onResult={console.log}
>{(result) => <div>{result}</div>}</Prompt>
```

## Props

  - `show` - boolean, optional, whether to show the prompt modal.
  - `message` - string, optional, string message to display to the user.
  - `default` - string, optional, default text to pre-fill the user's response input.
  - `onResult` - function, optional, function that receives prompt result string as a single argument.
