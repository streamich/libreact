const {configure} = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({
  adapter: new Adapter()
});

if (typeof window === 'object') {
  global.requestAnimationFrame = window.requestAnimationFrame = (callback) => setTimeout(callback, 17);
  global.matchMedia = window.matchMedia = (() => { return { matches: false, addListener: () => {}, removeListener: () => {}, }; });
}
