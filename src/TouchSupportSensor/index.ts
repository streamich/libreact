import * as React from "react";
import renderProp from "../util/renderProp";
import { IUniversalInterfaceProps } from "../typing";

export interface DocumentTouchConstructor extends Document {
  [key: string]: any;
  new (): DocumentTouchConstructor;
  readonly prototype: Document;
}

export interface TouchWindow extends Window {
  DocumentTouch?: DocumentTouchConstructor;
}

let DocumentTouch: DocumentTouchConstructor;

export interface ITouchSupportSensorState {
  touchSupported: boolean;
}

export interface ITouchSupportSensorProps
  extends IUniversalInterfaceProps<ITouchSupportSensorState> {
  onlyTouch?: boolean;
  onlyMouse?: boolean;
}

export const touchSupported = () => {
  const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
    ""
  );

  if (
    "ontouchstart" in window ||
    ((window as TouchWindow).DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true;
  }

  // TypeScript seems to think "ontouchstart" will always be on window, causing incorrect type narrowing
  return (window as Window).matchMedia(query).matches;
};

export class TouchSupportSensor extends React.Component<
  ITouchSupportSensorProps,
  ITouchSupportSensorState
> {
  constructor(props, context) {
    super(props, context);

    if (props.onlyMouse && props.onlyTouch) {
      console.warn(
        "You're using both `onlyMouse` and `onlyTouch` on the TouchSupportSensor component. This is unsupported and may lead to unexpected results."
      );
    }

    this.state = { touchSupported: touchSupported() };
  }

  render() {
    if (this.props.onlyMouse && this.state.touchSupported) {
      return null;
    }

    if (this.props.onlyTouch && !this.state.touchSupported) {
      return null;
    }

    return renderProp(this.props, this.state);
  }
}
