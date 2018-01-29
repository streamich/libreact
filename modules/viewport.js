import { Component } from 'react';
import { h } from './util';
import { ViewportSensor } from './ViewportSensor';
import { pixel } from './pixel';
export const viewport = (Comp, { placeholder = pixel } = {}) => {
    let flipped = false;
    const Viewport = class Viewport extends Component {
        constructor() {
            super(...arguments);
            this.onChange = () => {
                flipped = true;
                this.forceUpdate();
            };
        }
        render() {
            return flipped ?
                h(Comp, this.props) :
                h(ViewportSensor, { onChange: this.onChange }, placeholder);
        }
    };
    return Viewport;
};
