# `<Lifecycles>`

Inverts life-cycle methods.


## Usage

```jsx
import {Lifecycles} from 'libreact/lib/Lifecycles';

<Lifecycles didMount={() => console.log('Component did mount!')}>
  Hello world!
</Lifecycles>
```


## Props

Signature.

```ts
interface ILifecyclesProps {
  willMount?: (props) => void;
  didMount?: (props) => void;
  willReceiveProps?: (nextProps, props) => void;
  shouldUpdate?: (nextProps, props) => boolean;
  willUpdate?: (nextProps, props) => void;
  didUpdate?: (props, prevProps) => void;
  willUnmount?: (props) => void;
  didCatch?: (error, info, props) => void;
  [key: string]: any;
}
```
