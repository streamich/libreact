import { mount } from "enzyme";
import { h } from "../../util";
import { TouchSupportSensor } from "..";

declare const jsdom;

describe.only("<TouchSupportSensor>", () => {
  beforeEach(() => {
    jsdom.reconfigure({
      windowTop: window,
      url: "https://example.com/"
    });
  });

  it("is a component", () => {
    expect(TouchSupportSensor).toBeInstanceOf(Function);
  });

  it("renders without crashing", () => {
    mount(<TouchSupportSensor>{() => null}</TouchSupportSensor>);
  });

  it("returns expected default state", () => {
    mount(
      <TouchSupportSensor>
        {touchSupport => {
          expect(touchSupport).toMatchSnapshot();

          return null;
        }}
      </TouchSupportSensor>
    );
  });

  it("renders nothing when onlyTouch is true and the device doesn't support touch", () => {
    const component = mount(<TouchSupportSensor onlyTouch>(location) => <div /></TouchSupportSensor>)

    expect(component.find('div')).toHaveLength(0)
  })

  it("renders nothing when onlyMouse is true and the device does support touch", () => {
    window.ontouchstart = () => null

    const component = mount(<TouchSupportSensor onlyMouse>(location) => <div /></TouchSupportSensor>)

    expect(component.find('div')).toHaveLength(0)

    delete window.ontouchstart
  })

  it("renders children when onlyTouch is true and the device does support touch", () => {
    window.ontouchstart = () => null

    const component = mount(<TouchSupportSensor onlyTouch>(location) => <div /></TouchSupportSensor>)

    expect(component.find('div')).toHaveLength(1)

    delete window.ontouchstart
  })

  it("renders children when onlyMouse is true and the device doesn't support touch", () => {
    const component = mount(<TouchSupportSensor onlyMouse>(location) => <div /></TouchSupportSensor>)

    expect(component.find('div')).toHaveLength(1)
  })
});
