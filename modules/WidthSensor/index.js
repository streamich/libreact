import { Component, createElement as h } from 'react';
import { SizeSensor } from '../SizeSensor';
import { noop } from '../util';
import faccToHoc, { divWrapper } from '../util/faccToHoc';
export class WidthSensor extends Component {
    constructor() {
        super(...arguments);
        this.onSize = (size) => {
            if (this.state.width !== size.width) {
                this.setState(size);
                (this.props.onWidth || noop)(size);
            }
        };
    }
    render() {
        const { onWidth, ..._rest } = this.props;
        const rest = _rest;
        rest.onSize = this.onSize;
        return h(SizeSensor, rest);
    }
}
export const withWidth = faccToHoc(WidthSensor, 'size', divWrapper);
