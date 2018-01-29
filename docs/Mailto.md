# `<Mailto>`

Creates `<a>` element with `href` attribute formatted to send an e-mail.

## Usage

```jsx
import {Mailto} from 'libreact/lib/Mailto';

<Mailto email='foo@bar.baz' subject='Hello'>
  Click me!
</Mailto>
```

### Props

Signature

```ts
interface IMailtoProps {
  email: string;
  subject?: string;
  cc?: string[];
  bcc?: string[];
  body?: string;
}
```

, where

  - `email` - required, string, e-mail address.
  - `subject` - optional, string.
  - `cc` - optional, array of strings, representing e-mail addresses to CC.
  - `bcc` - optional, array of strings, representing e-mail addresses to BCC.
  - `body` - optional, string, e-mail body message.
