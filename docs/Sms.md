# `<Sms>`

Creates `<a>` element with `href` attribute formatted according to SMS protocol.

## Usage

```jsx
import {Sms} from 'libreact/lib/Sms';

<Sms phone='123' body='hello'>Click me!</Sms>
```

### Props

```ts
interface ISmsProps {
  phone: string;
  body?: string;
}
```

, where

  - `phone` - required, string, phone number.
  - `body` - optional, string, SMS text body.
