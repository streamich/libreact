# libreact

React standard library.

  - Collection of React goodies necessary for every project.
  - Isomorphic - all components work in browser and Node.
  - [See demos and docs](https://mailonline.github.io/mol-fe-react/)

## Installation

```shell
npm install libreact --save
```

## Usage

Import each utility individually to decrease your bundle size

```js
import {mock} from 'libreact/lib/mock';

const MyComponent = mock();
```

## Reference

  - Dummies
     - [`mock()`](./docs/mock.md)
     - [`loadable()`](./docs/loadable.md)
     - [`lazy()`](./docs/lazy.md)
     - [`delayed()`](./docs/delayed.md)
     - [`invert()`](./docs/invert.md)
  - Sensors
     - [`<BatterySensor>`](./docs/BatterySensor.md)
     - [`<MediaDeviceSensor>`](./docs/MediaDeviceSensor.md)
     - [`<MediaSensor>`](./docs/MediaSensor.md)
     - [`<NetworkSensor>`](./docs/NetworkSensor.md) and [`withNetwork()`](./docs/NetworkSensor.md#withnetwork)
     - [`<LightSensor>`](./docs/LightSensor.md)
     - [`<LocationSensor>`](./docs/LocationSensor.md)
     - [`<SizeSensor>`](./docs/SizeSensor.md)
     - [`<ScrollSensor>`](./docs/ScrollSensor.md)
     - [`<WidthSensor>`](./docs/WidthSensor.md)
     - [`<WindowSizeSensor>`](./docs/WindowSizeSensor.md)
     - [`<WindowScrollSensor>`](./docs/WindowScrollSensor.md)
  - Generators
     - [`<Audio>`](./docs/Audio.md)
     - [`<LocalStorage>`](./docs/LocalStorage.md)
     - [`<Speak>`](./docs/Speak.md)
     - [`<Vibrate>`](./docs/Vibrate.md)
  - Context
     - [`<Provider>`](./docs/context.md#provider), [`<Consumer>`](./docs/context.md#consumer), and [`withContext()`](./docs/context.md#withcontext)
     - [`<Theme>`](./docs/theme.md#theme), [`<Themed>`](./docs/theme.md#themed), and [`withTheme()`](./docs/theme.md#withtheme)
     - `<CssVars>`
     - [`<Router>`](./docs/route.md#router), [`<Route>`](./docs/route.md#route), [`go()`](./docs/route.md#go), and [`withRoute()`](./docs/route.md#withroute)
  - CSS resets
     - [`<CssResetEricMeyer>`](./docs/reset/CssResetEricMeyer.md)
     - [`<CssResetEricMeyerCondensed>`](./docs/reset/CssResetEricMeyerCondensed.md)
     - [`<CssResetMinimalistic>`](./docs/reset/CssResetMinimalistic.md)
     - [`<CssResetMinimalistic2>`](./docs/reset/CssResetMinimalistic2.md)
     - [`<CssResetMinimalistic3>`](./docs/reset/CssResetMinimalistic3.md)
     - [`<CssResetPoorMan>`](./docs/reset/CssResetPoorMan.md)
     - [`<CssResetShaunInman>`](./docs/reset/CssResetShaunInman.md)
     - [`<CssResetSiolon>`](./docs/reset/CssResetSiolon.md)
     - [`<CssResetTantek>`](./docs/reset/CssResetTantek.md)
     - [`<CssResetUniversal>`](./docs/reset/CssResetUniversal.md)
     - [`<CssResetYahoo>`](./docs/reset/CssResetYahoo.md)
  - Other
     - [`<Resolve>`](./docs/Resolve.md)
