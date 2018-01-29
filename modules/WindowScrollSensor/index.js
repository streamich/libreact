import { Component, createElement as h } from 'react';
import { SyncSensor } from '../SyncSensor';
import { isClient } from '../util';
import faccToHoc from '../util/faccToHoc';
const addListener = (handler) => window.addEventListener('scroll', handler, {
    capture: false,
    passive: true
});
const removeListener = (handler) => window.removeEventListener('scroll', handler);
const onEvent = () => ({
    x: window.scrollX,
    y: window.scrollY
});
const getInitialState = () => {
    if (isClient) {
        return onEvent();
    }
    else {
        return {
            x: 0,
            y: 0
        };
    }
};
export class WindowScrollSensor extends Component {
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
export const withWindowScroll = faccToHoc(WindowScrollSensor, 'windowScroll');
