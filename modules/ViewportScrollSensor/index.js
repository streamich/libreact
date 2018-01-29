import { Component, cloneElement } from 'react';
import { on, off, noop } from '../util';
import * as throttle from 'throttle-debounce/throttle';
import renderProp from '../util/renderProp';
const getElRect = (el) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    return [left, top, right, bottom];
};
const getRootRect = ([top, right, bottom, left]) => {
    return [
        0 - left,
        0 - top,
        (window.innerWidth || document.documentElement.clientWidth) + right,
        (window.innerHeight || document.documentElement.clientHeight) + bottom,
    ];
};
const intersect = (rect1, rect2) => {
    const [x1, y1, x2, y2] = rect1;
    const [x3, y3, x4, y4] = rect2;
    const x5 = Math.max(x1, x3);
    const x6 = Math.min(x2, x4);
    const y5 = Math.max(y1, y3);
    const y6 = Math.min(y2, y4);
    if ((x5 >= x6) || (y5 >= y6)) {
        return null;
    }
    return [x5, y5, x6, y6];
};
const area = ([x1, y1, x2, y2]) => (x2 - x1) * (y2 - y1);
export class ViewportScrollSensor extends Component {
    constructor() {
        super(...arguments);
        this.mounted = false;
        this.state = {
            visible: false
        };
        this.ref = (originalRef) => (el) => {
            this.el = el;
            (originalRef || noop)(el);
        };
        this.onScroll = throttle(this.props.throttle, false, () => {
            if (!this.mounted) {
                return;
            }
            const { threshold, margin, onChange } = this.props;
            let visible = false;
            const rectRoot = getRootRect(margin);
            const rectEl = getElRect(this.el);
            const rectIntersection = intersect(rectEl, rectRoot);
            if (rectIntersection) {
                const areaEl = area(rectEl);
                const areaIntersection = area(rectIntersection);
                const intersectionRatio = areaIntersection / areaEl;
                visible = !!((!threshold && intersectionRatio) || (intersectionRatio >= threshold));
            }
            if (visible !== this.state.visible) {
                const state = {
                    visible
                };
                this.setState(state);
                (onChange || noop)(state);
            }
        });
    }
    componentDidMount() {
        this.mounted = true;
        on(document, 'scroll', this.onScroll);
        this.onScroll();
    }
    componentWillUnmount() {
        this.mounted = false;
        off(document, 'scroll', this.onScroll);
    }
    render() {
        const { children } = this.props;
        const element = renderProp(this.props, this.state);
        if (process.env.NODE_ENV !== 'production') {
            if ((typeof element !== 'object') || (typeof element.type !== 'string')) {
                throw new TypeError('<ViewportScrollSensor> accepts a single child which must be ' +
                    'a plain DOM element or a function that returns one.');
            }
        }
        return cloneElement(element, {
            ref: this.ref(element.ref)
        });
    }
}
ViewportScrollSensor.defaultProps = {
    threshold: 0,
    throttle: 50,
    margin: [0, 0, 0, 0]
};
