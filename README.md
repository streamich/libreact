![libreact logo](./docs/libreact.png)

# libreact

[![][npm-badge]][npm-url] [![][travis-badge]][travis-url]

React standard library &mdash; must-have toolbox for any React project.

  - React sensors, FaCCs, render props, HOCs, context providers, dummies, and [other goodies](#contents).
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


## License

[Unlicense](./LICENSE) - public domain.


[npm-url]: https://www.npmjs.com/package/libreact
[npm-badge]: https://img.shields.io/npm/v/libreact.svg
[travis-url]: https://travis-ci.org/MailOnline/libreact
[travis-badge]: https://travis-ci.org/MailOnline/libreact.svg?branch=master
