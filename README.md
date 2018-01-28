![libreact logo](./docs/libreact.png)

# libreact

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

React standard library &mdash; must-have toolbox for any React project.

  - Collection of React sensors, FaCCs, render props, HOCs, context providers, dummies, and [other goodies](#contents).
  - *Isomorphic* - all components work in browser and on server (and some in `react-native`).
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

  - [Introduction](./docs/Introduction.md)
  - [Dummies](./docs/Dummies.md)
     - [`mock()`](./docs/mock.md) and [`loadable()`](./docs/loadable.md)
     - [`lazy()`](./docs/lazy.md), [`delayed()`](./docs/delayed.md), and [`viewport()`](./docs/viewport.md)
  - [Inversion](./docs/Inversion.md)
     - [`invert()`](./docs/invert.md) and [`<Inverted>`](./docs/invert.md#inverted)
     - [`<State>`](./docs/State.md) and [`withState()`](./docs/State.md#withstate-hoc)
        - [`<Toggle>`](./docs/Toggle.md), [`withToggle()`](./docs/Toggle.md#withtoggle-hoc), and [`@withToggle`](./docs/Toggle.md#withtoggle-decorator)
        - [`<Flipflop>`](./docs/Flipflop.md), [`withFlipflop()`](./docs/Flipflop.md#withflipflop-hoc), and [`@withFlipflop`](./docs/Flipflop.md#withflipflop-decorator)
        - [`<Value>`](./docs/Value.md), [`withValue()`](./docs/Value.md#withvalue-hoc), and [`@withValue`](./docs/Value.md#withvalue-decorator)
        - [`<Counter>`](./docs/Counter.md), [`withCounter()`](./docs/Counter.md#withcounter-hoc) and [`@withCounter`](./docs/Counter.md#withcounter-decorator)
        - [`<List>`](./docs/List.md), [`withList()`](./docs/List.md#withlist-hoc), and [`@withList`](./docs/List.md#withlist-decorator)
        - [`<Map>`](./docs/Map.md), [`withMap()`](./docs/Map.md#withmap-hoc), and [`@withMap`](./docs/Map.md#withmap-decorator)
  - [Sensors](./docs/Sensors.md)
     - [`<BatterySensor>`](./docs/BatterySensor.md), [`withBattery()`](./docs/BatterySensor.md#withbattery), and [`@withBattery`](./docs/BatterySensor.md#withbattery-1)
     - [`<GeoLocationSensor>`](./docs/GeoLocationSensor.md), [`withGeoLocation()`](./docs/GeoLocationSensor.md#withgeolocation-hoc), and [`@withGeoLocation`](./docs/GeoLocationSensor.md#withgeolocation-decorator)
     - [`<MediaDeviceSensor>`](./docs/MediaDeviceSensor.md), [`withMediaDevices()`](./docs/MediaDeviceSensor.md#withmediadevices), and [`@withMediaDevices`](./docs/MediaDeviceSensor.md#withmediadevices-1)
     - [`<MediaSensor>`](./docs/MediaSensor.md), [`withMedia()`](./docs/MediaSensor.md#withmedia), and [`@withMedia`](./docs/MediaSensor.md#withmedia-1)
     - [`<MotionSensor>`](./docs/MotionSensor.md), [`withMotion()`](./docs/MotionSensor.md#withmotion-hoc), and [`@withMotion`](./docs/MotionSensor.md#withmotion-decorator)
     - [`<MouseSensor>`](./docs/MouseSensor.md), [`withMouse()`](./docs/MouseSensor.md#withmouse-hoc), and [`@withMouse`](./docs/MouseSensor.md#withmouse-decorator)
     - [`<NetworkSensor>`](./docs/NetworkSensor.md), [`withNetwork()`](./docs/NetworkSensor.md#withnetwork-hoc), and [`@withNetwork`](./docs/NetworkSensor.md#withnetwork-decorator)
     - [`<LightSensor>`](./docs/LightSensor.md), [`withLight()`](./docs/LightSensor.md#withlight-hoc), and [`@withLight`](./docs/LightSensor.md#withlight-decorator)
     - [`<LocationSensor>`](./docs/LocationSensor.md), [`withLocation()`](./docs/LocationSensor.md#withlocation-hoc), and [`@withLocation`](./docs/LocationSensor.md#withlocation-decora)
     - [`<OrientationSensor>`](./docs/OrientationSensor.md), [`withOrientation()`](./docs/OrientationSensor.md#withorientation-hoc), and [`@withOrientation`](./docs/OrientationSensor.md#withorientation-decorator)
     - [`<ScrollSensor>`](./docs/ScrollSensor.md)
     - [`<SizeSensor>`](./docs/SizeSensor.md), [`withSize()`](./docs/SizeSensor.md#withsize-hoc), and [`@withSize`](./docs/SizeSensor.md#withsize-decorator)
        - [`<WidthSensor>`](./docs/WidthSensor.md), [`withWidth()`](./docs/WidthSensor.md#withwidth-hoc-and-withwidth-decorator), and [`@withWidth`](./docs/WidthSensor.md#withwidth-hoc-and-withwidth-decorator)
     - [`<ViewportSensor>`](./docs/ViewportSensor.md), [`withViewport()`](./docs/ViewportSensor.md#withviewport-hoc), and [`@withViewport`](./docs/ViewportSensor.md#withviewport-decorator)
        - [`<ViewportScrollSensor>`](./docs/ViewportSensor.md#viewportscrollsensor) and [`<ViewportObserverSensor>`](./docs/ViewportSensor.md#viewportobserversensor)
     - [`<WindowScrollSensor>`](./docs/WindowScrollSensor.md), [`withWindowScroll()`](./docs/WindowScrollSensor.md#withwindowscroll-hoc), and [`@withWindowScroll`](./docs/WindowScrollSensor.md#withwindowscroll-decorator)
     - [`<WindowSizeSensor>`](./docs/WindowSizeSensor.md), [`withWindowSize()`](./docs/WindowSizeSensor.md#withwindowsize-hoc), and [`@withWindowSize`](./docs/WindowSizeSensor.md#withwindowsize-decorator)
  - Generators
     - [`<Audio>`](./docs/Audio.md), [`<Video>`](./docs/Video.md), and `<Media>`
     - [`<LocalStorage>`](./docs/LocalStorage.md), `<SessionStorage>`, `<IndexedDb>`
     - [`<Speak>`](./docs/Speak.md), [`<Vibrate>`](./docs/Vibrate.md), [`<Alert>`](./docs/Alert.md), `<Prompt>`, `<Confirm>`
     - [`go()`](./docs/route.md#go), `<Redirect>`, `<Link>`, [`<Sms>`](./docs/Sms.md), [`<Mailto>`](./docs/Mailto.md), and `<Tel>`
     - [`<FullScreen>`](./docs/FullScreen.md), `<Overlay>`
  - Promises
     - [`<Resolve>`](./docs/Resolve.md), `<Fetch>`
  - Context
     - [`<Provider>`](./docs/context.md#provider), [`<Consumer>`](./docs/context.md#consumer), [`withContext()`](./docs/context.md#withcontext), and `@withContext`
     - [`<Theme>`](./docs/theme.md#theme), [`<Themed>`](./docs/theme.md#themed), [`withTheme()`](./docs/theme.md#withtheme), and `@withTheme`
     - `<CssVars>`
     - [`<Router>`](./docs/route.md#router), [`<Route>`](./docs/route.md#route), [`withRoute()`](./docs/route.md#withroute), and `@withRoute`
     - `<Translations>`, `<Translate>`, `withTranslations`, and `@withTranslations`
  - [CSS resets](./docs/CSS-resets.md)
     - [`<CssResetEricMeyer>`](./docs/reset/CssResetEricMeyer.md) and [`<CssResetEricMeyerCondensed>`](./docs/reset/CssResetEricMeyerCondensed.md)
     - [`<CssResetMinimalistic>`](./docs/reset/CssResetMinimalistic.md), [`<CssResetMinimalistic2>`](./docs/reset/CssResetMinimalistic2.md), and [`<CssResetMinimalistic3>`](./docs/reset/CssResetMinimalistic3.md)
     - [`<CssResetPoorMan>`](./docs/reset/CssResetPoorMan.md)
     - [`<CssResetShaunInman>`](./docs/reset/CssResetShaunInman.md)
     - [`<CssResetSiolon>`](./docs/reset/CssResetSiolon.md)
     - [`<CssResetTantek>`](./docs/reset/CssResetTantek.md)
     - [`<CssResetUniversal>`](./docs/reset/CssResetUniversal.md)
     - [`<CssResetYahoo>`](./docs/reset/CssResetYahoo.md)
  - Other
     - [`getDisplayName()`](./docs/getDisplayName.md)
     - `<BrowserOnly>`, `<ServerOnly>`, and `<Environment>`
     - `<Locales>`
     - `<Draggable>`, `<Droppable>`, `<Parallax>`, `<Pin>`


## License

[Unlicense](./LICENSE) - public domain.


[npm-url]: https://www.npmjs.com/package/libreact
[npm-badge]: https://img.shields.io/npm/v/libreact.svg
[travis-url]: https://travis-ci.org/MailOnline/libreact
[travis-badge]: https://travis-ci.org/MailOnline/libreact.svg?branch=master
