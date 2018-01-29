import { Component, cloneElement } from 'react';
import { noop } from '../util';
import renderProp from '../util/renderProp';
export class ViewportObserverSensor extends Component {
    constructor() {
        super(...arguments);
        this.mounted = false;
        this.el = null;
        this.observer = null;
        this.state = {
            visible: false
        };
        this.ref = (originalRef) => (el) => {
            this.el = el;
            (originalRef || noop)(el);
        };
        this.onObserve = (entries) => {
            const entry = entries[0];
            const { intersectionRatio } = entry;
            const { threshold, onChange } = this.props;
            const state = {
                visible: !!((!threshold && intersectionRatio) || (intersectionRatio >= threshold))
            };
            this.setState(state);
            (onChange || noop)(state);
        };
    }
    componentDidMount() {
        const { margin, threshold } = this.props;
        this.mounted = true;
        this.observer = new IntersectionObserver(this.onObserve, {
            rootMargin: margin.map((val) => val + 'px').join(' '),
            threshold
        });
        this.observer.observe(this.el);
    }
    componentWillUnmount() {
        this.mounted = false;
        this.observer.unobserve(this.el);
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
ViewportObserverSensor.defaultProps = {
    threshold: 0,
    margin: [0, 0, 0, 0]
};
