# `createLifecycleEvents()`

Create life-cycles for component tree.


## Usage

```jsx
import {createLifecycleEvents} from 'libreact/lib/shim';

const Lifecycles = createLifecycleEvents({
  didMount: ({foo}) => {
    console.log('Tree did mount!');
    console.log(`"foo" is "${foo}.`);
  },
  willUnmount: () => {
    console.log('Tree will un-mount!');
  },
});

<Lifecycles foo='bar'>
  <div>
    Hello world!
  </div>
</Lifecycles>
```
