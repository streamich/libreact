![libreact logo](./docs/libreact.png)

# libreact

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

React standard library, must-have toolbox for any React project.

  - Collection of React sensors, FaCCs, HOCs, context providers, dummies, and [other goodies](#contents).
  - Isomorphic - all components work in browser and on server (and some in `react-native`).
  - See [demos](https://mailonline.github.io/libreact/) and [docs](#contents).

## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/libreact">libreact</a> --save
</pre>

## Usage

Import each utility individually to decrease your bundle size

```js
import {mock} from 'libreact/lib/mock';

const MyComponent = mock();
```

## Contents

  - Basics
     - [`mock()`](./docs/mock.md) and [`loadable()`](./docs/loadable.md)
     - [`lazy()`](./docs/lazy.md), [`delayed()`](./docs/delayed.md), and `viewport()`
     - [`invert()`](./docs/invert.md), `<State>`
  - Sensors
     - [`<BatterySensor>`](./docs/BatterySensor.md), [`withBattery()`](./docs/BatterySensor.md#withbattery), and [`@withBattery`](./docs/BatterySensor.md#withbattery-1)
     - [`<MediaDeviceSensor>`](./docs/MediaDeviceSensor.md), [`withMediaDevices()`](./docs/MediaDeviceSensor.md#withmediadevices), and [`@withMediaDevices`](./docs/MediaDeviceSensor.md#withmediadevices-1)
     - [`<MediaSensor>`](./docs/MediaSensor.md), [`withMedia()`](./docs/MediaSensor.md#withmedia), and [`@withMedia`](./docs/MediaSensor.md#withmedia-1)
     - [`<NetworkSensor>`](./docs/NetworkSensor.md), [`withNetwork()`](./docs/NetworkSensor.md#withnetwork-hoc), and [`@withNetwork`](./docs/NetworkSensor.md#withnetwork-decorator)
     - [`<LightSensor>`](./docs/LightSensor.md), [`withLight()`](./docs/LightSensor.md#withlight-hoc), and [`@withLight`](./docs/LightSensor.md#withlight-decorator)
     - [`<LocationSensor>`](./docs/LocationSensor.md), [`withLocation()`](./docs/LocationSensor.md#withlocation-hoc), and [`@withLocation`](./docs/LocationSensor.md#withlocation-decorator)
     - [`<OrientationSensor>`](./docs/OrientationSensor.md) and [`withOrientation()`](./docs/OrientationSensor.md#withorientation)
     - [`<ScrollSensor>`](./docs/ScrollSensor.md)
     - [`<SizeSensor>`](./docs/SizeSensor.md)
     - [`<ViewportSensor>`](./docs/ViewportSensor.md), `withViewport`, and `@withViewport`
        - [`<ViewportScrollSensor>`](./docs/ViewportSensor.md#viewportscrollsensor) and [`<ViewportObserverSensor>`](./docs/ViewportSensor.md#viewportobserversensor)
     - [`<WidthSensor>`](./docs/WidthSensor.md)
     - [`<WindowScrollSensor>`](./docs/WindowScrollSensor.md)
     - [`<WindowSizeSensor>`](./docs/WindowSizeSensor.md)
  - Generators
     - [`<Audio>`](./docs/Audio.md), [`<Video>`](./docs/Video.md), and `<Media>`
     - [`<LocalStorage>`](./docs/LocalStorage.md), `<SessionStorage>`, `<IndexedDb>`
     - [`<Speak>`](./docs/Speak.md), [`<Vibrate>`](./docs/Vibrate.md), [`<Alert>`](./docs/Alert.md), `<Prompt>`, `<Confirm>`
     - [`go()`](./docs/route.md#go), `<Redirect>`, `<Link>`, `<Sms>`, `<Mailto>`, and `<Tel>`
  - Promises
     - [`<Resolve>`](./docs/Resolve.md), `<Fetch>`
  - Context
     - [`<Provider>`](./docs/context.md#provider), [`<Consumer>`](./docs/context.md#consumer), [`withContext()`](./docs/context.md#withcontext), and `@withContext`
     - [`<Theme>`](./docs/theme.md#theme), [`<Themed>`](./docs/theme.md#themed), [`withTheme()`](./docs/theme.md#withtheme), and `@withTheme`
     - `<CssVars>`
     - [`<Router>`](./docs/route.md#router), [`<Route>`](./docs/route.md#route), [`withRoute()`](./docs/route.md#withroute), and `@withRoute`
     - `<Translations>`, `<Translate>`, `withTranslations`, and `@withTranslations`
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


## License

[Unlicense](./LICENSE) - public domain.


[npm-url]: https://www.npmjs.com/package/libreact
[npm-badge]: https://img.shields.io/npm/v/libreact.svg
[travis-url]: https://travis-ci.org/MailOnline/libreact
[travis-badge]: https://travis-ci.org/MailOnline/libreact.svg?branch=master
