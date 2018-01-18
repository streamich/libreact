const {configure} = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');

configure({
  adapter: new Adapter()
});
