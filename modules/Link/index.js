import { Component, cloneElement } from 'react';
import { h, noop } from '../util';
import { go } from '../route/go';
import renderProp from '../util/renderProp';
const isModifiedEvent = (event) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
export class Link extends Component {
    constructor() {
        super(...arguments);
        this.el = null;
        this.target = '';
        this.ref = (originalRef) => (el) => {
            this.el = el;
            (originalRef || noop)(el);
        };
        this.onClick = (originalClick) => (event) => {
            (originalClick || noop)(event);
            const { onGo, replace, to, state } = this.props;
            if (!event.defaultPrevented &&
                event.button === 0 &&
                !this.target &&
                !isModifiedEvent(event)) {
                event.preventDefault();
                onGo(to, {
                    replace,
                    state: typeof state === 'function' ? state(this.props) : state
                });
            }
        };
    }
    render() {
        let { bond, replace, state, to, a, isActive, ...rest } = this.props;
        const renderPropState = {
            isActive,
            go,
            to
        };
        if (bond) {
            if (typeof bond !== 'string') {
                bond = 'bond';
            }
            renderPropState[bond] = {
                onClick: this.onClick()
            };
        }
        let element = renderProp(this.props, renderPropState);
        if (!element) {
            return null;
        }
        if (a || (typeof element !== 'object')) {
            element = h('a', rest, element);
        }
        const props = {
            ref: this.ref(element.ref)
        };
        if (!bond) {
            props.onClick = this.onClick(element.props.originalClick);
        }
        this.target = '';
        if (element.type === 'a') {
            this.target = element.props.target;
            props.href = to;
        }
        return cloneElement(element, props);
    }
}
Link.defaultProps = {
    onGo: go
};
