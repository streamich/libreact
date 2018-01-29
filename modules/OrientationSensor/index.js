import { Component } from 'react';
import { SyncSensor } from '../SyncSensor';
import { h, on, off, isClient } from '../util';
import faccToHoc from '../util/faccToHoc';
const DEFAULT = {
    angle: 0,
    type: 'landscape-primary'
};
const addListener = (handler) => on(window, 'orientationchange', handler);
const removeListener = (handler) => off(window, 'orientationchange', handler);
const onEvent = () => {
    const { orientation } = screen;
    if (!orientation) {
        return DEFAULT;
    }
    const { angle, type } = orientation;
    return {
        angle,
        type
    };
};
const getInitialState = () => {
    return isClient ? onEvent() : DEFAULT;
};
export class OrientationSensor extends Component {
    constructor() {
        super(...arguments);
        this.initial = getInitialState();
    }
    render() {
        return h(SyncSensor, {
            children: this.props.children,
            initial: this.initial,
            addListener,
            removeListener,
            onEvent
        });
    }
}
export const withOrientation = faccToHoc(OrientationSensor, 'orientation');
