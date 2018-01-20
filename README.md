# mol-fe-react

React.js utility belt.

## Installation

```shell
npm install mol-fe-react --save
```

## Usage

Import each utility individually to decrease your bundle size

```js
import {mock} from 'mol-fe-react/lib/mock';

const MyComponent = mock();
```

## Reference

  - Dummies
     - [`mock()`](./docs/mock.md)
     - [`loadable()`](./docs/loadable.md)
     - [`lazy()`](./docs/lazy.md)
     - [`delayed()`](./docs/delayed.md)
  - Sensors
     - [`<SizeSensor>`](./docs/SizeSensor.md)
     - [`<WidthSensor>`](./docs/WidthSensor.md)
     - [`<ScrollSensor>`](./docs/ScrollSensor.md)
     - [`<MediaSensor>`](./docs/MediaSensor.md)
     - [`<WindowSizeSensor>`](./docs/WindowSizeSensor.md)
     - [`<WindowScrollSensor>`](./docs/WindowScrollSensor.md)
     - [`<NetworkSensor>`](./docs/NetworkSensor.md)
     - [`<BatterySensor>`](./docs/BatterySensor.md)
  - Generators
     - [`<Speak>`](./docs/Speak.md)
  - Context
     - [`<Provider>`](./docs/context.md#provider), [`<Consumer>`](./docs/context.md#consumer), and [`withContext()`](./docs/context.md#withcontext)
     - [`<Theme>`](), [`<Themed>`](), and `withTheme()`
     - `<CssVars>`

