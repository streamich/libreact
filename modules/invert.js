import { Component } from 'react';
import { h, noop } from './util';
import renderProp from './util/renderProp';
const defaultWrapper = (element) => element;
export const invert = (tag) => {
    const Inverted = (_a = class Inverted extends Component {
            constructor() {
                super(...arguments);
                this.el = null;
                this.ref = (el) => {
                    this.el = el;
                };
            }
            componentDidMount() {
                (this.props.onMount || noop)(this.el, this);
                this.forceUpdate();
            }
            componentWillUnmount() {
                (this.props.onUnmount || noop)(this.el, this);
                this.el = null;
            }
            event(name, handler) {
                return (event) => {
                    handler(event, this.el, this);
                    this.forceUpdate();
                };
            }
            render() {
                const { event } = this;
                const { children, render, wrapper, tag: tagProp, onMount, onUnmount, ...rest } = this.props;
                const props = {
                    ref: this.ref
                };
                for (const name in rest) {
                    const value = rest[name];
                    if ((name[0] === 'o') && (name[1] === 'n') && (typeof value === 'function')) {
                        props[name] = this.event(name, value);
                    }
                    else {
                        props[name] = value;
                    }
                }
                const element = h(tagProp || tag, props, renderProp(this.props, this));
                return wrapper(element, this);
            }
        },
        _a.defaultProps = {
            wrapper: defaultWrapper
        },
        _a);
    return Inverted;
    var _a;
};
export const Inverted = invert();
