import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {Slider} from '..';
import {h, noop} from '../../util';

const mountSlider = (props = {}) => mount(
  <Slider onScrub={jest.fn()} onScrubStart={jest.fn()} onScrubStop={jest.fn()} value={0.5} {...props}>
    {({value}) =>
      <div>{value}</div>
    }
  </Slider>
);

const simulate = (instance, events, assertions) => new Promise((resolve, reject) => {
  events.sort(([timeout1], [timeout2]) => {
    if (timeout1 > timeout2) {
      return 1;
    } else {
      return -1;
    }
  });

  for (const [timeout, eventNameOrCallback, event] of events) {
    if (typeof eventNameOrCallback === 'function') {
      setTimeout(eventNameOrCallback, timeout);
    } else {
      setTimeout(() => {
        let method = '';

        switch (eventNameOrCallback) {
        case 'mousedown':
          method = 'onMouseDown';
          instance[method]()(event);
          return;
        case 'mousemove':
          method = 'onMouseMove';
          break;
        case 'mouseup':
          method = 'onMouseUp';
          break;
        case 'touchstart':
          method = 'onTouchStart';
          instance[method]()(event);
          return;
        case 'touchmove':
          method = 'onTouchMove';
          break;
        case 'touchend':
          method = 'onTouchEnd';
          break;
        default:
          throw new Error(`Event "${eventNameOrCallback}" not supported.`);
        }

        instance[method](event);
      }, timeout);
    }
  }

  const lastTimeout = events[events.length - 1][0];

  setTimeout(() => {
    try {
      assertions();
      resolve(undefined);
    } catch (error) {
      reject(error);
    }
  }, lastTimeout + 200);
});

const mouseEventX = (clientX) => ({clientX});
const mouseEventY = (clientY) => ({clientY});
const touchEventX = (clientX) => ({changedTouches: [{clientX}]});

const rect = {
  bottom: 200,
  height: 200,
  left: 0,
  right: 100,
  top: 0,
  width: 100
};
const getBoundingClientRectReal = Element.prototype.getBoundingClientRect;

describe('<Slider>', () => {
  beforeEach(() => {
    const fn = jest.fn();

    Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
      value: fn,
      writable: true
    });

    fn.mockImplementation(() => rect);
  });

  afterEach(() => {
    Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
      value: getBoundingClientRectReal,
      writable: true
    });
  });

  it('renders without crashing', () => {
    mount(
      <Slider onScrub={noop} onScrubStart={noop} onScrubStop={noop} value={0.2}>
        {({value}) =>
          <div>{value}</div>
        }
      </Slider>
    );
  });

  it('renders as expected', () => {
    const wrapper = shallow(
      <Slider onScrub={noop} onScrubStart={noop} onScrubStop={noop} value={0.2}>
        {({value}) =>
          <div>{value}</div>
        }
      </Slider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('passes through FaCC child', () => {
    const wrapper = shallow(
      <Slider onScrub={noop} onScrubStart={noop} onScrubStop={noop} value={0.2}>
        {({value}) =>
          <div>{value}</div>
        }
      </Slider>
    );

    expect(wrapper.find('div').props().children).toBe(0.2);
  });

  // Currently, `jsdom` does not support `clientY`, so we create fake event objects.
  // https://github.com/tmpvar/jsdom/issues/1911
  describe('mouse events', () => {
    it('call onScrub on mousedown', () => {
      const onScrub = jest.fn();
      const wrapper = mount(
        <Slider onScrub={onScrub} onScrubStart={noop} onScrubStop={noop} value={0.5}>
          {({value}) =>
            <div>{value}</div>
          }
        </Slider>
      );
      const instance = wrapper.instance();

      instance.onMouseDown()(mouseEventX(20));

      expect(onScrub).toHaveBeenCalledTimes(1);
      expect(onScrub.mock.calls[0]).toEqual([0.20]);
      expect(onScrub.mock.calls[0]).not.toEqual([0.21]);
    });

    it('passes through new value to FaCC on mousedown', () => {
      const onScrub = jest.fn();
      const wrapper = mount(
        <Slider onScrub={onScrub} onScrubStart={noop} onScrubStop={noop} value={0.5}>
          {({value}) =>
            <div>{value}</div>
          }
        </Slider>
      );
      const instance = wrapper.instance();

      expect(wrapper.find('div').props().children).toBe(0.5);

      instance.onMouseDown()(mouseEventX(30));

      wrapper.update();
      expect(wrapper.find('div').props().children).toBe(0.3);
    });

    describe('mouse event slider', () => {
      describe('horizontal', () => {
        describe('adjusts slider value to the latest position', () => {
          it('only mousedown event', () => {
            const wrapper = mountSlider();
            const instance = wrapper.instance();
            const FINAL_VALUE = 25;

            return simulate(instance, [
              [10, 'mousedown', mouseEventX(FINAL_VALUE)]
            ], () => {
              const calls = wrapper.props().onScrub.mock.calls;

              expect(calls[calls.length - 1]).toEqual([FINAL_VALUE / 100]);
            });
          });

          it('only one mousemove event', () => {
            const wrapper = mountSlider();
            const instance = wrapper.instance();
            const FINAL_VALUE = 25;

            return simulate(instance, [
              [10, 'mousedown', mouseEventX(0)],
              [20, 'mousemove', mouseEventX(FINAL_VALUE)]
            ], () => {
              const calls = wrapper.props().onScrub.mock.calls;

              expect(calls[calls.length - 1]).toEqual([FINAL_VALUE / 100]);
            });
          });

          describe('many mousemove events fired in a single 50ms throttle frame', () => {
            it('sets the last value', () => {
              const wrapper = mountSlider();
              const instance = wrapper.instance();
              const FINAL_VALUE = 25;

              return simulate(instance, [
                [10, 'mousedown', mouseEventX(0)],

                [22, 'mousemove', mouseEventX(1)],
                [25, 'mousemove', mouseEventX(2)],
                [27, 'mousemove', mouseEventX(3)],
                [29, 'mousemove', mouseEventX(4)],
                [30, 'mousemove', mouseEventX(5)],
                [33, 'mousemove', mouseEventX(FINAL_VALUE)]
              ], () => {
                const calls = wrapper.props().onScrub.mock.calls;

                expect(calls[calls.length - 1]).toEqual([FINAL_VALUE / 100]);
              });
            });

            it('throttles, calls .onScrub() only once for mousemove event', () => {
              const wrapper = mountSlider();
              const instance = wrapper.instance();
              const FINAL_VALUE = 25;

              return simulate(instance, [
                [10, 'mousedown', mouseEventX(0)],

                [22, 'mousemove', mouseEventX(1)],
                [25, 'mousemove', mouseEventX(2)],
                [27, 'mousemove', mouseEventX(3)],
                [29, 'mousemove', mouseEventX(4)],
                [30, 'mousemove', mouseEventX(5)],
                [33, 'mousemove', mouseEventX(FINAL_VALUE)]
              ], () => {
                expect(wrapper.props().onScrub).toHaveBeenCalledTimes(2);
              });
            });
          });

          describe('mousemove events fired across throttle 50ms frames', () => {
            it('sets the last value', () => {
              const wrapper = mountSlider();
              const instance = wrapper.instance();
              const FINAL_VALUE = 60;

              return simulate(instance, [
                [10, 'mousedown', mouseEventX(0)],

                [30, 'mousemove', mouseEventX(77)],
                [66, 'mousemove', mouseEventX(23)],
                [99, 'mousemove', mouseEventX(3)],
                [120, 'mousemove', mouseEventX(4)],
                [200, 'mousemove', mouseEventX(5)],
                [230, 'mousemove', mouseEventX(FINAL_VALUE)]
              ], () => {
                const calls = wrapper.props().onScrub.mock.calls;

                expect(calls[calls.length - 1]).toEqual([FINAL_VALUE / 100]);
              });
            });

            it('throttles by 50ms', () => {
              const wrapper = mountSlider();
              const instance = wrapper.instance();
              const FINAL_VALUE = 60;

              return simulate(instance, [
                [10, 'mousedown', mouseEventX(0)],

                [30, 'mousemove', mouseEventX(77)],
                [31, 'mousemove', mouseEventX(78)],
                [50, 'mousemove', mouseEventX(44)],
                [66, 'mousemove', mouseEventX(23)],
                [77, 'mousemove', mouseEventX(23)],
                [99, 'mousemove', mouseEventX(3)],
                [100, 'mousemove', mouseEventX(44)],
                [120, 'mousemove', mouseEventX(4)],
                [123, 'mousemove', mouseEventX(4)],
                [130, 'mousemove', mouseEventX(43)],
                [134, 'mousemove', mouseEventX(41)],
                [156, 'mousemove', mouseEventX(42)],
                [176, 'mousemove', mouseEventX(43)],
                [186, 'mousemove', mouseEventX(44)],
                [200, 'mousemove', mouseEventX(4)],
                [212, 'mousemove', mouseEventX(3)],
                [234, 'mousemove', mouseEventX(5)],
                [230, 'mousemove', mouseEventX(FINAL_VALUE)]
              ], () => {
                expect(wrapper.props().onScrub).toHaveBeenCalledTimes(6);
              });
            });
          });
        });

        describe('does not set value if dimensions of slider collapse', () => {
          // Useful when slider is hidden by CSS, its dimensions collapse.
          it('works', () => {
            const wrapper = mountSlider();
            const instance = wrapper.instance();
            const FINAL_VALUE = 25;

            return simulate(instance, [
              [10, 'mousedown', mouseEventX(10)],
              [20, 'mousemove', mouseEventX(FINAL_VALUE)],
              [70, () => {
                (Element.prototype.getBoundingClientRect as any).mockImplementation(() => ({
                  bottom: 0,
                  height: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                  width: 0
                }));
              }],
              [100, 'mousemove', mouseEventX(75)]
            ], () => {
              const calls = wrapper.props().onScrub.mock.calls;

              expect(calls[calls.length - 1]).toEqual([FINAL_VALUE / 100]);
            });
          });
        });
      });

      describe('vertical', () => {
        it('fires correctly onScrub on mousedown', () => {
          const wrapper = mountSlider({vertical: true});
          const instance = wrapper.instance();
          const onScrub = wrapper.props().onScrub;

          instance.onMouseDown()(mouseEventY(20));

          expect(onScrub).toHaveBeenCalledTimes(1);
          expect(onScrub.mock.calls[0]).toEqual([20 / 200]);
        });

        describe('limits value to [0, 1]', () => {
          it('when mouse moves over 1', () => {
            const wrapper = mountSlider({vertical: true});
            const instance = wrapper.instance();
            const onScrub = wrapper.props().onScrub;

            return simulate(instance, [
              [1, 'mousedown', mouseEventY(50)],
              [20, 'mousemove', mouseEventY(100)],
              [30, 'mousemove', mouseEventY(140)],
              [40, 'mousemove', mouseEventY(170)],
              [50, 'mousemove', mouseEventY(220)]
            ], () => {
              const {calls} = onScrub.mock;
              const lastValue = calls[calls.length - 1][0];

              expect(lastValue).toBe(1);
            });
          });

          it('when mouse moves below 0', () => {
            const wrapper = mountSlider({vertical: true});
            const instance = wrapper.instance();
            const onScrub = wrapper.props().onScrub;

            return simulate(instance, [
              [1, 'mousedown', mouseEventY(50)],
              [20, 'mousemove', mouseEventY(40)],
              [30, 'mousemove', mouseEventY(30)],
              [40, 'mousemove', mouseEventY(-10)],
              [50, 'mousemove', mouseEventY(-111)]
            ], () => {
              const {calls} = onScrub.mock;
              const lastValue = calls[calls.length - 1][0];

              expect(lastValue).toBe(0);
            });
          });

          it('when mouse moves out of range all the time', () => {
            const wrapper = mountSlider({vertical: true});
            const instance = wrapper.instance();
            const onScrub = wrapper.props().onScrub;

            return simulate(instance, [
              [1, 'mousedown', mouseEventY(50)],
              [20, 'mousemove', mouseEventY(220)],
              [30, 'mousemove', mouseEventY(250)],
              [40, 'mousemove', mouseEventY(-10)],
              [50, 'mousemove', mouseEventY(-200)],
              [60, 'mousemove', mouseEventY(-400)],
              [80, 'mousemove', mouseEventY(500)]
            ], () => {
              const {calls} = onScrub.mock;

              for (const [value] of calls) {
                expect(value >= 0).toBe(true);
                expect(value <= 1).toBe(true);
              }
            });
          });
        });

        describe('stops on mouseup', () => {
          it('works', () => {
            const wrapper = mountSlider({vertical: true});
            const instance = wrapper.instance();

            return simulate(instance, [
              [1, 'mousedown', mouseEventY(50)],

              [20, 'mousemove', mouseEventY(90)],

              [35, 'mouseup', mouseEventY(120)]
            ], () => {
              expect(wrapper.state().isSliding).toBe(false);
            });
          });
        });
      });
    });
  });

  describe('touch events', () => {
    it('calls onScrub on touchstart', () => {
      const wrapper = mountSlider();
      const instance = wrapper.instance();

      instance.onTouchStart()(touchEventX(10));

      const onScrub = wrapper.props().onScrub;

      expect(onScrub).toHaveBeenCalledTimes(1);
      expect(onScrub.mock.calls[0]).toEqual([10 / 100]);
    });

    it('moves slider on touchmove', () => {
      const wrapper = mountSlider();
      const instance = wrapper.instance();

      simulate(instance, [
        [10, 'touchstart', touchEventX(10)],
        [20, 'touchmove', touchEventX(20)],
        [30, 'touchmove', touchEventX(30)]
      ], () => {
        const onScrub = wrapper.props().onScrub;
        const calls = onScrub.mock.calls;
        const lastCall = calls[calls.length - 1];

        expect(lastCall).toEqual([30 / 100]);
      });
    });
  });
});
