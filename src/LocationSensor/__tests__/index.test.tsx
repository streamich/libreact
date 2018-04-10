import {mount} from 'enzyme';
import {h} from '../../util';
import {LocationSensor} from '..';

declare const jsdom;

describe('<LocationSensor>', () => {
  beforeEach(() => {
    jsdom.reconfigure({
      windowTop: window,
      url: "https://example.com/"
    });
  });

  it('is a component', () => {
    expect(LocationSensor).toBeInstanceOf(Function);
  });

  it('renders without crashing', () => {
    mount(
      <LocationSensor>{() =>
        null
      }</LocationSensor>
    );
  });

  it('returns expected default state', () => {
    mount(
      <LocationSensor>{(location) => {
        expect(location).toMatchSnapshot();

        return null;
      }}</LocationSensor>
    );
  });

  describe('re-renders on', () => {
    const events = [
      'pushstate',
      'replacestate',
      'popstate'
    ];

    events.forEach((eventName) => {
      it(eventName, () => {
        const paths = [];
        const triggers = [];

        const wrapper = mount(
          <LocationSensor>{(location) => {
            triggers.push(location.trigger);
            paths.push(location.pathname);

            return null;
          }}</LocationSensor>
        );

        jsdom.reconfigure({
          windowTop: window,
          url: "https://example.com/foobar"
        });

        const event = new Event(eventName);

        window.dispatchEvent(event);

        wrapper.update();

        expect(triggers).toEqual(['load', eventName]);
        expect(paths).toEqual(['/', '/foobar']);
      });
    });
  });
});
